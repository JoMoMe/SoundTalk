const e = require('express');
const Posts = require('../models/posts');

exports.createPost = async (req, res) => {
    try {
        const posts = new Posts(req.body)
        await posts.save()
        res.send(posts)
    }
    catch (error){
        console.log(error)
    }
}

exports.getRandomPosts = async (req, res) => {
    const allposts = await Posts.find(
        { mail: req.params.mail, _id: req.params.id}
    )
    res.send(allposts)
}

exports.editPosts = async (req, res) => {
    await Posts.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Post actualizado'})
}

exports.deletePosts = async (req, res) => {
    await Posts.findByIdAndDelete(req.params.id)
    res.json({status: 'Post eliminado'})
}

exports.getPost = async (req, res) => {
    try {
        const mypost = await Users.findOne(
            { mail: req.params.mail, password: req.params.password }
        )
        if (mypost){
            res.send(mypost)
        }
    }
    catch (error){
        console.log(error)
    }
}