const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')
const postCtrl = require('../controllers/post.controller.js')

// menu/profile
router.get('/', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/', postCtrl.getPost);
router.put('/:id', postCtrl.editPosts);
router.delete('/:id', postCtrl.deletePosts);

module.exports = router;