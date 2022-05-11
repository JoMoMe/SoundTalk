const e = require('express');
const mongoose = require("mongoose");
const { GridFSBucket } = require('mongodb')
const Posts = require('../models/posts');
const Comments = require('../models/comments');
const Photos = require('../models/photos');
const path = require('path')
const fs = require('fs-extra')
const multer = require('multer');
const {Readable} = require('stream');
const audiofiles = require('../models/audio.files');
const { ObjectID } = require('bson');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

//CREACION DE UN AUDIO EN RUTA menu/audio 
exports.createAudio = async (req, res) => {
    try {
        const storage = multer.memoryStorage()
        const uploadConditions = multer({
            storage: storage,
            limits: {
                fields: 1,
                fileSize: 1000000000000,
                files: 1,
            }
        })
        uploadConditions.single('track')(req, res, (err) => {
            if (err){
                return res.status(400).json({message: err.message})
            }

            const readableTrackStream = new Readable()
            readableTrackStream.push(req.file.buffer)
            readableTrackStream.push(null)
    
            const bucket = new GridFSBucket(mongoose.connection.db,{
                bucketName: 'audio'
            })
    
            let uploadAudio = bucket.openUploadStream()
            const id = uploadAudio.id
            readableTrackStream.pipe(uploadAudio)
    
            uploadAudio.on('error', () => {
                return res.status(500).json({message: 'Error de subida de archivo'})
            })
    
            uploadAudio.on('finish', () => {
                res.status(201).send(id)
            })
        })
    }
    catch (error){
        console.log(error)
    }
}


//OBTENCION DE UN AUDIO MEDIANTE RUTA menu/audio/:id 
exports.getAudio = async (req, res) => {
    try {

        const trackID = new ObjectID(req.params.id)

        res.set('content-type', 'audio/mp3')
        res.set('accept-ranges', 'bytes')
    
        const bucket = new GridFSBucket(mongoose.connection.db,{
            bucketName: 'audio'
        })
        
        let downloadAudio = bucket.openDownloadStream(trackID)
    
        downloadAudio.on('data', chunk => {
            res.write(chunk)
        })
    
        downloadAudio.on('error', () => {
            res.sendStatus(404)
        })
    
        downloadAudio.on('end', () => {
            res.end()
        })
    }
    catch (error){
        res.status(401).send("Audio inexistente")
    }
}

exports.deleteAudio = async (req, res) => {
    try {

    }
    catch (error){
        console.log(error)
    }
}

exports.createPhoto = async (req, res) => {
    try {
        const newPhoto = {
            filepath: req.file.path
        }
        const photo = new Photos(newPhoto)
        await photo.save()
        const id = photo._id
        res.status(201).json(id)
    }
    catch (error){
        console.log(error)
    }
}

exports.getPhoto = async (req, res) => {
    try {
        const myphoto = await Photos.findOne({_id: req.params.id})
        if (myphoto){
            res.json(myphoto.filepath)
        }
        else{
            res.status(401).send("La imagen no existe")
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        const myphoto = await Photos.findOne({_id: req.params.id})
        if (myphoto){
            const deleteFromDataBase = await Photos.findByIdAndRemove({_id: req.params.id})
            if (deleteFromDataBase){
                const deleteFromServerFolder = await fs.unlink(path.resolve(myphoto.filepath))
            }
                res.json("La imagen se eliminó correctamente")
        }
        else{
            res.status(401).send("La imagen no existe")
        }
    }
    catch (error){
        console.log(error)
    }
}

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

exports.getallPosts = async (req, res) => {
    const allposts = await Posts.find()
    res.json(allposts)
}

exports.getRandomPosts = async (req, res) => {
    const allposts = await Posts.find()
    console.log(allposts)
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
        res.send(comments._id)
    }
    catch (error){
        console.log(error)
    }
}

exports.commentIDInPost = async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(req.params.id, req.body)
        res.send('Comentario creado en post')
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