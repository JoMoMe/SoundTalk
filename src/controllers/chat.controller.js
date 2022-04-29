const Chats = require('../models/chats');
const Messages = require('../models/messages');
const Users = require('../models/users');

exports.getChats = async (req, res) => {
    try {
        const mychats = await Chats.findOne(
            {userid: req.params.id}
        )
        if (mychats){
            for (let i = 0; i < mychats.length; i++) {
                var sortedTime = mychats[i].lastmessagetime.sort()
            }
            res.send(sortedTime.userid2)
        }
        else{
            const mychats = await Chats.findOne(
                {userid2: req.params.id}
            )
            if (mychats){
                for (let i = 0; i < mychats.length; i++) {
                    var sortedTime = mychats[i].lastmessagetime.sort()
                }
                res.send(sortedTime.userid)
            }
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.getUserOfChat = async (req, res) => {
    try {
        const chatuser = await Users.findOne(
            { _id: req.params.id}
        )
        if (chatuser){
            res.send(chatuser.username)
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.chargeLastMessage = async (req, res) => {
    try {
        const lastmessage = await Messages.findOne(
            { _id: req.params.id}
        )
        if (lastmessage){
            res.send(lastmessage.text)
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.getAllUsers = async (req, res) => {
    const allusers = await Users.find()
    res.send(allusers)
}

exports.getOneChat = async (req, res) => {
    try {
        const lastmessage = await Messages.findOne(
            { _id: req.params.id}
        )
        if (lastmessage){
            res.send(lastmessage.text)
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.putMessageInChat = async (req, res) => {
    try {
        await Chats.findByIdAndUpdate(req.params.id, req.body)
        res.json({status: 'Mensaje adherido en chat'})
    }
    catch (error){
        console.log(error)
    }
}

exports.getMessages = async (req, res) => {
    try {
        const messagesofchat = await Messages.findOne(
            { _id: req.params.id }
        )
        if (messagesofchat){
            res.send(messagesofchat)
        }
    }
    catch (error){
        console.log(error)
    }
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