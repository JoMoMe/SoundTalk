const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// /login   CONFIRMA MAIL PARA ACTUALIZAR CONTRASEÑA
router.get('/:mail', userCtrl.RememberPassword);

// /login   CONFIRMA MAIL Y CONTRASEÑA
router.get('/:mail/:password', userCtrl.UserExists);

module.exports = router;