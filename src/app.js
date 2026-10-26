const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const solicitacaoRoutes = require('./routes/solicitacaoRoutes');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/solicitacoes', solicitacaoRoutes);

module.exports = app;