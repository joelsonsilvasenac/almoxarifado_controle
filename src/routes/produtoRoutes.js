const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, produtoController.listarProdutos);
router.get('/:id', authMiddleware, produtoController.listarProdutosPorID); 
router.post('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), produtoController.criarProduto);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), produtoController.atualizarProduto);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'SuperAdmin']), produtoController.deletarProduto);
module.exports = router;
