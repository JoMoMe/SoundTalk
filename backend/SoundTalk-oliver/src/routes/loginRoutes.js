const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// /login   CONFIRMA MAIL Y CONTRASEÑA
router.post('/', userCtrl.UserExists);

module.exports = router;