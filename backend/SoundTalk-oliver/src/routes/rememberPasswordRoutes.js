const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// /rememberpassword   CONFIRMA MAIL PARA ACTUALIZAR CONTRASEÑA
router.get('/:mail', userCtrl.RememberPassword);
router.put('/rewrite/:id', userCtrl.ResetPassword);

module.exports = router;