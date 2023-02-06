const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = espress.Router();

router.get('/login', LoginController.index);
router.get('/register', LoginController.register);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);

module.exports = router;