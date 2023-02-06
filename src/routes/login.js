const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/register', LoginController.registro);
router.post('/register', LoginController.dato_usuario);

router.get('/logout', LoginController.cerrar_sesion);

module.exports = router;