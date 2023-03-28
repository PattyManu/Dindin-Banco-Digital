const pool = require("../../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("./senhaJwt");

const loginDeUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const validacaoDosCampos = () => {
      if (!email && !senha) {
        return res.json({ mensagem: "Preencha todos os campos obrigatorios!" });
      }
    };

    const { rows, rowCount } = await pool.query(
      `select * from usuarios where email = $1`,
      [email]
    );
    if (rowCount === 0) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos!" });
    }

    const { senha: senhaUsuario, ...usuario } = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos!" });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: "8h" });

    return res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor!" });
  }
};

module.exports = loginDeUsuario;
