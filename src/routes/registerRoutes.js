const { Router } = require('express')
const router = Router()

const userController = require('../controllers/UserController.js')

router.post('/', userController.createUser);

module.exports = router