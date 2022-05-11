const express = require('express');
const router = express.Router()
const Users = require('../models/users');
const Tokens = require('../models/tokens');
const Photo = require('../models/photos');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
var cookieSession = require('cookie-session')

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
    await Users.findByIdAndDelete(req.params.id)
    res.json({status: 'User eliminado'})
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