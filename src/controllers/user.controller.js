const userCtrl = {}

const User = require('../models/User')

userCtrl.getUser = async (req, res) => {
    const oneuser = await User.findById(req.params.id)
    res.json(oneuser)
}
userCtrl.createUser = (req, res) => {
    const users = new User(req.body)
    console.log("enviamos",users)
    users.save()
        .then(() => console.log("llego",users))
        .catch((error) => res.json(error))
}
userCtrl.editUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'User actualizado'})
}
userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({status: 'User eliminado'})
}

module.exports = userCtrl;