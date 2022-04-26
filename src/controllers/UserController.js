const userController = {}

const User = require('../models/User')

userController.getUser = async (req, res) => {
    const oneuser = await User.find()
    res.json(oneuser)
}
userController.createUser = async (req, res) => {
    const users = new User(req.body)
    await users.save()
    res.send("empleado creado")
}
userController.editUser = (req, res) => {}
userController.deleteUser = (req, res) => {}

module.exports = userController;