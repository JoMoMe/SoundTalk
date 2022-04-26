const { Router } = require('express')
const router = Router()

const userController = require('../controllers/UserController.js')

router.get('/', userController.getUser);
//router.put('/', userController.editUser);
//router.delete('/', userController.deleteUser);

module.exports = router