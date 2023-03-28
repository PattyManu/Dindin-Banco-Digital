const pool = require("../../conexao");

const listarTransacoes = async (req, res) => {
  try {
    const { rows: transacoes } = await pool.query(
      `select * from transacoes where usuario_id = $1`,
      [req.usuario.id]
    );

    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

module.exports = listarTransacoes;
