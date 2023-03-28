const express = require('express');
const cadastrarUsuario = require('../comandos/usuario/cadastrarUsuarios');
const loginDeUsuario = require('../comandos/usuario/senha/login');
const detalharPerfilUsuario = require('../comandos/usuario/detalharPerfilUsuario');
const atualizarPerfil = require('../comandos/usuario/atualizarPerfil');
const listarCategorias = require('../comandos/usuario/listarCategorias');
const cadastrarTransacoes = require('../comandos/transacoesBancarias/cadastrarTransacoes');
const autenticaLogin = require('../comandos/intermediarios/autenticaLogin');
const atualizarTransacao = require('../comandos/transacoesBancarias/editarTransacoes');
const extratoTransacao = require('../comandos/transacoesBancarias/extratoTransacoes');
const detalharTransacoes = require('../comandos/transacoesBancarias/detalharTransacoes');
const excluirTransacao = require('../comandos/transacoesBancarias/removerTransacoes');
const listarTransacoes = require('../comandos/transacoesBancarias/listarTransacoes');

const roteador = express();

roteador.post('/usuario', cadastrarUsuario);
roteador.post('/login', loginDeUsuario);

roteador.use(autenticaLogin);

roteador.post('/transacao', cadastrarTransacoes);

roteador.get('/usuario', detalharPerfilUsuario);
roteador.get('/transacao', listarTransacoes);
roteador.get('/categoria', listarCategorias);
roteador.get('/transacao/extrato', extratoTransacao);
roteador.get('/transacao/:id', detalharTransacoes);

roteador.put('/usuario', atualizarPerfil);
roteador.put('/transacao/:id', atualizarTransacao);

roteador.delete('/transacao/:id', excluirTransacao);

module.exports = roteador;