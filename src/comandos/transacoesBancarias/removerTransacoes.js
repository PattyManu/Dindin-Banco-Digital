const pool = require("../../conexao");

const excluirTransacao = async (req, res) => {
  const { id: usuario } = req.usuario;

  const transacaoId = req.params.id;

  try {
    const queryExisteTransacao = `select * from transacoes where usuario_id = $1 and id = $2`;
    const { rowCount: transacao } = await pool.query(queryExisteTransacao, [
      usuario,
      transacaoId,
    ]);

    if (transacao <= 0) {
      return res.status(400).json({
        mensagem: "Não se foi encontrado nenhuma transação com este id",
      });
    }

    const queryDeletarTransacao = `delete from transacoes where id = $1`;
    const queryRemover = await pool.query(queryDeletarTransacao, [transacaoId]);

    if (queryRemover.rowCount === 0) {
      return res.status(404).json({
        mensagem:
          "Não foi encontrada nenhuma transação correspondente a este Id!",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

module.exports = excluirTransacao;
