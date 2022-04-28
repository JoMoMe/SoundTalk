const e = require('express');
const Users = require('../models/users');

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

exports.createUser = async (req, res) => {
    try {
        const useralreadyexists = await Users.findOne(
            { mail: req.params.mail, password: req.params.password }
        )
        if (useralreadyexists){
            res.send({message: "Aquest mail ja està registrat, sisplau, loguejat amb ell"})
        }
        else{
            const users = new Users(req.body)
            await users.save()
            res.send(users)
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
            { mail: req.params.mail, password: req.params.password }
        )
        if (mailpassexists){
            res.send({message: "Mail y contraseña encontrados, bienvenido"})
        }
        else{
            res.send({message: "Mail y contraseña no encontrados, intenta de nuevo"})
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
            res.send({message: "Mail encontrado",users})
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