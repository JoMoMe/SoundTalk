const Messages = require('../models/messages');

exports.getMessage = async (req, res) => {
    try {
        const onemessage = await Messages.findOne(
            { _id: req.params.id}
        )
        res.json({message: onemessage})
    }
    catch (error){
        console.log(error)
    }
}

exports.createMessage = async (req, res) => {
    try {
        let chats;
        chats = new Messages(req.body)
        await chats.save()
        res.json({message: chats})
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