const pool = require("../../conexao");

const detalharTransacoes = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  const transacoes = req.params.id;

  try {
    const queryTransacoes = `select * from transacoes where usuario_id = $1 and id = $2`;
    const { rows, rowCount } = await pool.query(queryTransacoes, [
      usuario_id,
      transacoes,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({
        mensagem: "Não foi encontrado nenhuma transação deste usúario!",
      });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

module.exports = detalharTransacoes;
