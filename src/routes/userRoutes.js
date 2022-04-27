const { Router } = require('express')
const router = Router()

const userCtrl = require('../controllers/user.controller.js')

router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;