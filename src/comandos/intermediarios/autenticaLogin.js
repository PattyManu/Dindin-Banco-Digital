const jwt = require("jsonwebtoken");
const segredo = require("../usuario/senha/senhaJwt");
const pool = require("../../conexao");

const autenticaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({
      mensagem: "Insira um token válido",
    });
  }

  try {
    const token = authorization.replace("Bearer", " ").trim();
    const { id } = jwt.verify(token, segredo);

    const queryConsultaId = `select * from usuarios where id = $1`;
    const consultaId = await pool.query(queryConsultaId, [id]);

    if (consultaId.rowCount === 0) {
      return res.status(404).json({
        mensagem: "Nenhum usuario encontrado!",
      });
    }

    const { senha, ...usuario } = consultaId.rows;

    req.usuario = usuario[0];

    next();
  } catch (error) {
    return res.status(500).json({
      mensagem: `${error}`,
    });
  }
};

module.exports = autenticaLogin;
