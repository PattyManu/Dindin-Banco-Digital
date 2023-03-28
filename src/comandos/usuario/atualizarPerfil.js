const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const verificar = () => {
      if (!nome && !email && !senha) {
        return res.status(400).json({
          mensagem: "Preencha todos os campos!",
        });
      }
    };

    const vereficaoDeEmailExistente = await pool.query(
      ` select * from usuarios where email = $1 `,
      [email]
    );
    if (vereficaoDeEmailExistente.rowCount > 0) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const novaSenhaCriptografada = await bcrypt.hash(senha, 10);

    const queryDeInsercao = `
      insert into usuarios (nome, email, senha) 
      values ($1, $2, $3) returning *
      `;
    const cadastrar = await pool.query(queryDeInsercao, [
      nome,
      email,
      novaSenhaCriptografada,
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
      mensagem: `${error}`,
    });
  }
};

module.exports = atualizarPerfil;
