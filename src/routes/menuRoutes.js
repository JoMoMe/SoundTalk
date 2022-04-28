const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller.js')
const postCtrl = require('../controllers/post.controller.js')

// /menu
router.get('/', userCtrl.getUser);
router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getRandomPosts);

module.exports = router;