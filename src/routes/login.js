const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.get('/register', LoginController.registro);
router.post('/auth', LoginController.dato_usuario);
router.get('/logout', LoginController.cerrar_sesion);

module.exports = router;