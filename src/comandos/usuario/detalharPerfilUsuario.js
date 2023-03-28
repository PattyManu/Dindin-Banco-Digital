const detalharPerfilUsuario = async (req, res) => {
  const { id, nome, email } = req.usuario;

  const detalhesDoUsuario = {
    id,
    nome,
    email,
  };

  return res.status(200).json(detalhesDoUsuario);
};

module.exports = detalharPerfilUsuario;
