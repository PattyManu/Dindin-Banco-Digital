const pool = require("../../conexao");

const atualizarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  const { usuario } = req;
  try {
    const descricaoTipo = () => {
      if (tipo !== "entrada" || tipo !== "saida") {
        return res.status(404).json({
          mensagem: "adicione um tipo correto",
        });
      }
    };

    const queryDeInsercao = `
        insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) 
        values ($1, $2, $3, $4, $5, $6) returning *
        `;

    const atualizarDados = await pool.query(queryDeInsercao, [
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      usuario.id,
    ]);
    if (atualizarDados.rowCount <= 0) {
      return res.status(500).json({
        mensagem: "erro interno no servidor",
      });
    }

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

module.exports = atualizarTransacao;
