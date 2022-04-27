const Chats = require('../models/chats');

exports.getChats = async (req, res) => {
    const chats = await Chats.find()
    res.send(chats)
}

exports.getChat = async (req, res) => {
    const oneuser = await Chats.findById(req.params.id)
    res.json(oneuser)
}

exports.createChat = async (req, res) => {
    try {
        let chats;
        chats = new Chats(req.body)
        await chats.save()
        res.send(chats)
    }
    catch (error){
        console.log(error)
    }
}

exports.deleteChat = async (req, res) => {
    await Chats.findByIdAndDelete(req.params.id)
    res.json({status: 'Chat eliminado'})
}