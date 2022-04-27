const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// /register
router.post('/', userCtrl.createUser);

module.exports = router;