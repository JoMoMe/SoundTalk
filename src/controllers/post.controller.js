const e = require('express');
const Posts = require('../models/posts');
const Comments = require('../models/comments');


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
    const allposts = await Posts.find()
    var count = 10
    var allrandoms = []
    const length = allposts.length-1
    for (let i = 0; i < count; i++) {
        const rnd = Math.round(Math.random() * length )
        const foundarray = allrandoms.find(element => element == rnd);
        if (rnd == foundarray){
            console.log("Num repetido")
        }
        else{
            count -= 1
            allrandoms.push(rnd)
            console.log(rnd)
            console.log(allposts[rnd])
        }
    }
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
        const mypost = await Posts.findOne(
            { _id: req.params.id}
        )
        if (mypost){
            res.send(mypost)
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.commentPost = async (req, res) => {
    try {
        const comments = new Comments(req.body)
        await comments.save()
        res.json({message: comments._id})
    }
    catch (error){
        console.log(error)
    }
}

exports.commentIDInPost = async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(req.params.id, req.body)
        res.json({status: 'Comentario creado en post'})
    }
    catch (error){
        console.log(error)
    }
}

exports.searchCommentsOfPosts = async (req, res) => {
    try {
        const comments = await Comments.findOne(
            { _id: req.params.id}
        )
        if (comments){
            res.send(comments)
        }
    }
    catch (error){
        console.log(error)
    }
}