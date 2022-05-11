const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// /login/cookie/   CONFIRMA MAIL Y CONTRASEÑA
router.get('/:cookie', userCtrl.getUserById);

module.exports = router;