const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')

// menu/profile
router.get('/', userCtrl.getUsers);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;