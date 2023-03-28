const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const validacaoDosCampos = () => {
      if (!nome && !email && !senha) {
        return res.status(404).json({
          mensagem: "Preencha todos os campos!",
        });
      }
    };

    const emailExiste = await pool.query(
      `select * from usuarios where email = $1`,
      [email]
    );
    if (emailExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: "O email já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const queryDeInsercao = `
    insert into usuarios (nome, email, senha) 
    values ($1, $2, $3) returning *
    `;
    const cadastrar = await pool.query(queryDeInsercao, [
      nome,
      email,
      senhaCriptografada,
    ]);
    if (cadastrar.rowCount <= 0) {
      return res.staus(500).json({
        mensagem: "erro interno",
      });
    }

    const { senha: _, ...usuario } = cadastrar.rows[0];

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno no servidor",
    });
  }
};

module.exports = cadastrarUsuario;
