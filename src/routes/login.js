const express = require('express');
const LoginController = require('../controllers/LogiinController');

const router = espress.Router();

router.get('/login', LoginController.login);
router.get('/register', LoginController.register);

module.exports = router;