const Messages = require('../models/messages');

exports.getMessage = async (req, res) => {
    const onemessage = await Messages.findById(req.params.id)
    res.json(onemessage)
}

exports.createMessage = async (req, res) => {
    try {
        let chats;
        chats = new Messages(req.body)
        await chats.save()
        res.send(chats)
    }
    catch (error){
        console.log(error)
    }
}

exports.editMessage = async (req, res) => {
    await Messages.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Mensaje editado'})
}

exports.deleteMessage = async (req, res) => {
    await Messages.findByIdAndDelete(req.params.id)
    res.json({status: 'Mensaje eliminado'})
}