const express = require('express');
const router = express.Router()
const Users = require('../models/users');
const Tokens = require('../models/tokens');
const Photo = require('../models/photos');
const Contacts = require('../models/contacts');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
var cookieSession = require('cookie-session');
const Posts = require('../models/posts');
const Comments = require('../models/comments');
const postCtrl = require('../controllers/post.controller.js');
const { request } = require('http');
var mongoose = require('mongoose');


function SendMail(usertosend, title, message, link){
    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'olbope@fp.insjoaquimmir.cat',
            pass: 'Olbope21_'
        }
    });

    var message = {
        from: "olbope@fp.insjoaquimmir.cat",
        to: usertosend,
        subject: title,
        html: message + 'pulsa <a href='+link+'>aquí</a> para activar tu cuenta <br><br><br><img src="https://img.imagenescool.com/ic/bienvenidos/bienvenidos_002.jpg"/>',
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } 
        else {
          console.log(info);
        }
    });
}

exports.getUserById = async (req, res) => {
    const users = await Users.findOne({ _id: req.params.cookie}
    )
    if (users) {
        res.json(users)
    }
    else{
        res.status(401).send("No encontramos la ID de este usuario")                
    }
}

exports.getUsersofPosts = async (req, res) => {
    const users = await Users.findOne(
        {_id: req.params.id}
    )
    res.send(users)
}

exports.getUsers = async (req, res) => {
    const users = await Users.find(
        { mail: req.params.mail, _id: req.params.id}
    )
    res.send(users)
}

exports.getUser = async (req, res) => {
    try {
        const miuser = await Users.findOne(
            { mail: req.params.mail, password: req.params.password }
        )
        if (miuser){
            res.send(miuser)
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.editUser = async (req, res) => {
    await Users.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'User actualizado'})
}

exports.deleteUser = async (req, res) => {
    const user = await Users.findOne({_id: req.params.id})
    if (user){
        const userstring = JSON.stringify(user)
        const myuser = JSON.parse(userstring)

        const userposts = await Posts.find({userid: myuser._id})
        if (userposts){
            const upostsstring = JSON.stringify(userposts)
            const posts = JSON.parse(upostsstring)
            
            for (let x = 0; x < userposts.length; x++){
                const req = {params: {idpost: posts[x]._id}};
                await postCtrl.deletePosts(req,res)
            }
        }

        const usercomments = await Comments.find({userid: myuser._id})
        if (usercomments){
            const ucommentstring = JSON.stringify(usercomments)
            const comments = JSON.parse(ucommentstring)

            for (let x = 0; x < usercomments.length; x++){
                const postwithcomment = await Posts.findOne({commentsid: comments[x]._id})
                if (postwithcomment){
                    const pstring = JSON.stringify(postwithcomment)
                    const post = JSON.parse(pstring)

                    const req = {params: {id: post._id, idcomment: comments[x]._id }};
                    await postCtrl.deleteComment(req,res)
                }
            }
        }

        const userlikes = await Posts.find({likes: myuser._id})
        if(userlikes){
            var coincidence=0
            for (let x = 0; x < userlikes.length; x++){
                for (let y = 0; y < userlikes[x].likes.length; y++){
                    if (myuser._id == userlikes[x].likes[y]){
                        coincidence+=1
                    }
                    if (coincidence>0){
                        userlikes[x].likes.remove(userlikes[x].likes[y])
                        userlikes[x].save()
                    }                   
                }
            }
        }

        for (let x = 0; x < myuser.contactsid.length; x++){
            let userfriend = Users.findOne({_id: myuser.contactsid[x]})
            userfriend.contactsid.remove(myuser._id)
            userfriend.save()
        }

        var contacts1 = await Contacts.find({myuserid: myuser._id})
        if(contacts1){
            for (let x = 0; x < contacts1.length; x++){
                await Contacts.findOneAndRemove({_id: contacts1[x]._id})
            }
        }

        var contacts2 = await Contacts.find({userrequestid: myuser._id})
        if(contacts2){
            for (let x = 0; x < contacts2.length; x++){
                await Contacts.findOneAndRemove({_id: contacts2[x]._id})
            }
        }

        const users = await Users.find()
        var coincidence=0
        for (let y = 0; y < users.length; y++){
            for (let x = 0; x < users[y].requestsid.length; x++){
                if (users[y].requestsid[x] == myuser._id){
                    coincidence+=1
                }
                if (coincidence>0){
                    users[y].requestsid.remove(users[y].requestsid[x])
                    users[y].save()
                }
            }
        }
        await Tokens.findOneAndRemove({user_id: req.params.id})
        await Users.findOneAndRemove({_id: req.params.id})
        res.json("usuario eliminado correctamente")
    }
}

exports.UserExists = async (req, res) => {
    try {
        const mailpassexists = await Users.findOne(
            { mail: req.body.mail, password: req.body.password }
        )
        if (mailpassexists){
            if (mailpassexists.accountactive == 1){
                res.json(mailpassexists)                
            }
            else{
                res.status(401).send("Este usuario no está autenticado, consulte su mail y verifique!")                
            }
        }
        else{
            res.status(401).send("El mail y la contraseña no coinciden, pruebe de nuevo")
        }
    }
    catch (error){
        console.log(error)
    }
}

const MailExists = async (req, res) => {
    try {
        const users = await Users.findOne(
            { mail: req.body.mail }
        )
        if (users){
            return true
        }
        else{
            return false
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.createUser = async (req, res) => {
    try {
            var resultMail = await MailExists(req)
            if(resultMail){
                res.status(401).send("El mail ya esta registrado, pruebe de nuevo")
            }
            else{
                const users = new Users(req.body)
                await users.save()

                var token = jwt.sign({user_id: users._id}, 'secrettoken')

                const tokens = new Tokens({token: token, user_id: users._id})
                await tokens.save()

                var usertosend = req.body.mail
                var title = "Confirma tu nuevo usuario!"
                var message = "Gracias por formar parte de nuestro equipo en SoundTalk, solo nos falta un paso más para que disfrutes la experiencia..."
                var link = "http://localhost:4002/#/validate/"+token

                var mailsended = SendMail(usertosend, title, message, link)
                res.send(true)
            }
        }
    catch (error){
        console.log(error)
    }
}

exports.RememberPassword = async (req, res) => {
    try {
        const users = await Users.findOne(
            { mail: req.params.mail }
        )
        if (users){
            var isValidated = users.accountactive
            if (isValidated == 0){
                res.send({message: "Tu mail no está validado, compruebe su mail antes"})
            }
            else{
                res.send({message: "Mail encontrado",users})
            }
        }
        else{
            res.send({message: "Mail no encontrado, intenta de nuevo"})
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.ResetPassword = async (req, res) => {
    try {
        await Users.findByIdAndUpdate(req.params.id, req.body)
        res.json({status: 'Contraseña actualizada'})
    }
    catch (error){
        console.log(error)
    }
}


exports.checkRequested = async (req,res) =>{
    try {
        const user = await Users.findOne({_id: req.params.id})
        if (user){
            var coincidence=0

            for (let x = 0; x < user.requestsid.length; x++){
                if (user.requestsid[x] == req.params.idrequestuser){
                    coincidence+=1
                }
            }
            if (coincidence > 0){
                res.json({isRequested:true})
            }
            else{
                res.json({isRequested:false})
            }
        }

    }
    catch (error){
        console.log(error)
    }
}

exports.addFriend = async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.body.myuserid})
        if (user){
            var coincidence=0
            for (let x = 0; x < user.requestsid.length; x++){
                if (user.requestsid[x] == req.body.userrequestid){
                    coincidence+=1
                }
            }
            if (coincidence > 0){
                var deletereq = await Contacts.findOneAndRemove({userrequestid: req.body.userrequestid, myuserid: user._id})
                user.requestsid.remove(req.body.userrequestid)
                user.save()
                res.json({isRequested:false})
            }
            else{
                let newarray = [...user.requestsid, req.body.userrequestid]
                const contacts = new Contacts(req.body)
                await contacts.save()

                let userupdate = await user.updateOne({requestsid: newarray })
                res.json({isRequested:true})
            }
        }

    }
    catch (error){
        console.log(error)
    }
}

exports.getMyRequests = async (req, res) => {
    const requests = await Contacts.find({userrequestid: req.params.id, status: 0})
    if (requests) {
        let myusers = []
        for (let x = 0; x < requests.length; x++){
            myusers[x] = await Users.findOne({_id: requests[x].myuserid})
        }
        res.send(myusers)

    }
    else{
        res.status(401).send("No encontramos la ID de este usuario")                
    }
}

exports.deleteNewRequest = async (req, res) => {
    const requests = await Contacts.findOneAndRemove({userrequestid: req.params.id, myuserid: req.params.idrequestuser })
    if (requests) {
        console.log("ENTRÓ")
        var user= await Users.findOne({_id: req.params.idrequestuser})
        if (user){
            user.requestsid.remove(req.params.id)
            user.save()
        }
        res.json("Solicitud eliminada con éxito")
    }
    else{
        res.status(401).send("No encontramos la ID de este usuario")                
    }
}

exports.acceptNewRequest = async (req, res) => {
    console.log(req.body)
    const requests = await Contacts.findOneAndUpdate({userrequestid: req.params.id, myuserid: req.params.idrequestuser }, req.body)
    if (requests) {
        var myuser= await Users.findOne({_id: req.params.id})
        if (myuser){
            myuser.contactsid.push(req.params.idrequestuser)
            myuser.save()
        }
        var frienduser= await Users.findOne({_id: req.params.idrequestuser})
        if (frienduser){
            frienduser.contactsid.push(req.params.id)
            frienduser.save()
        }
        res.json("Usuario agregado con éxito!")        
    }
    else{
        res.status(401).send("No encontramos la ID de este usuario")                
    }
}

exports.deleteMyFriend = async (req, res) => {
    try{
        var myuser= await Users.findOne({_id: req.params.id})
        myuser.contactsid.remove(req.params.idrequestuser)
        myuser.requestsid.remove(req.params.idrequestuser)
        myuser.save()
            
        var userequest= await Users.findOne({_id: req.params.idrequestuser})
        userequest.contactsid.remove(req.params.id)
        userequest.requestsid.remove(req.params.id)
        userequest.save()
        res.json("Solicitud eliminada con éxito")
        const requests = await Contacts.findOneAndRemove({userrequestid: req.params.id, myuserid: req.params.idrequestuser })
        const requests2 = await Contacts.findOneAndRemove({userrequestid: req.params.idrequestuser, myuserid: req.params.id })
    }
    catch{
        res.status(401).send("No encontramos la ID de este usuario")
    }
}