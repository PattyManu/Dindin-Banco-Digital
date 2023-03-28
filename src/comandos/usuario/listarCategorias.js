const pool = require("../../conexao");

const listarCategorias = async (req, res) => {
  try {
    const { rows: categorias } = await pool.query(`select * from categorias`);

    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({
      mensagem: `${error}`,
    });
  }
};

module.exports = listarCategorias;
