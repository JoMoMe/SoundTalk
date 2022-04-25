const { Router } = require('express')
const router = Router()

const userController = require('../controllers/UserController.js')

router.get('/', userController.createUser);

module.exports = router