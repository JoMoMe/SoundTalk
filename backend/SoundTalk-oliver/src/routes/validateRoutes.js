const express = require('express')
const router = express.Router()

const tokenCtrl = require('../controllers/token.controller.js')

// validate
router.get('/:token', tokenCtrl.validateToken);

module.exports = router;