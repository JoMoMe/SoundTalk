const userController = {}


userController.getUser = (req, res) => {
    res.send('get User')
}
userController.createUser = (req, res) => {
    res.send('Create User')
}
userController.editUser = (req, res) => {}
userController.deleteUser = (req, res) => {}

module.exports = userController;