const e = require('express');
const Posts = require('../models/promo');
const postCtrl = require('../controllers/post.controller.js')

exports.getPromoPost = async (req, res) => {
    const allposts = await Posts.find()
    for (let i = 0; i < allposts.length; i++) {
        postCtrl.getPost(allposts[i].idpost)
    }
}