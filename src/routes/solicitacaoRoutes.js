const express = require('express');
const router = express.Router();
const solicitacaoController = require('../controllers/solicitacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, solicitacaoController.criarSolicitacao);
router.get('/minhas', authMiddleware, solicitacaoController.minhasSolicitacoes);
router.get('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), solicitacaoController.listarTodas);

module.exports = router;