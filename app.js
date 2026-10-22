const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');
const solicitacaoRoutes = require('./src/routes/solicitacaoRoutes');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/solicitacoes', solicitacaoRoutes);

module.exports = app;