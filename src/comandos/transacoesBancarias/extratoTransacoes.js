const pool = require("../../conexao");

const extratoTransacao = async (req, res) => {
  const { usuario } = req;

  try {
    const queryBanco = `select sum(valor) as saldo from transacoes where usuario_id = $1 and tipo = $2`;

    const queryEntrada = await pool.query(queryBanco, [usuario.id, "entrada"]);
    const querySaida = await pool.query(queryBanco, [usuario.id, "saida"]);

    return res.status(200).json({
      entrada: Number(queryEntrada.rows[0].saldo) ?? 0,
      saida: Number(querySaida.rows[0].saldo) ?? 0,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

module.exports = extratoTransacao;
