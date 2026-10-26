const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/login', usuarioController.login);
router.get('/me', authMiddleware, usuarioController.verPerfil);
router.post('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), usuarioController.criarUsuario);

module.exports = router;