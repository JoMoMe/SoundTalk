const Users = require('../models/users');

exports.getUsers = async (req, res) => {
    const users = await Users.find()
    res.send(users)
}

exports.createUser = async (req, res) => {
    try {
        let users;

        users = new Users(req.body)

        console.log("object recibido",users)
        await users.save()
        res.send(users)
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
        const users = await Users.findOne(req.body.mail, req.body.password)
        res.json({status: 'Mail y contraseña en orden, user encontrado', users})
    }
    catch (error){
        console.log(error)
    }}

exports.RememberPassword = async (req, res) => {
    try {
        const users = await Users.findOne(req.body.mail)
        res.send({message: "Mail encontrado",users})
    }
    catch (error){
        console.log(error)
    }
}