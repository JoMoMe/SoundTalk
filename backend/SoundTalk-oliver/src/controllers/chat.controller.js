const Chats = require('../models/chats');
const Messages = require('../models/messages');
const Users = require('../models/users');
var mongoose = require('mongoose');

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

exports.getChats = async (req, res) => {
    try {
        const mychats = await Chats.find({userid1: req.params.id}).sort({updatedAt: 'descending'})
        const mychats2 = await Chats.find({userid2: req.params.id}).sort({updatedAt: 'descending'})
        if (mychats){
            res.json(mychats)
        }
        if (mychats2){
            res.json(mychats2)
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
        const mychats = await Chats.findOne({userid1: req.params.id, userid2: req.params.userid})
        const mychats2 = await Chats.findOne({userid1: req.params.userid, userid2: req.params.id})
        let messages = []
        if (mychats != null){
            for (let i = 0; i < mychats.messageid.length; i++) {
                let mens = await Messages.findOne({_id: mychats.messageid[i]})
                messages[i] = mens
            }
            res.json(messages)
        }
        if (mychats2 != null){
            for (let i = 0; i < mychats2.messageid.length; i++) {
                let mens = await Messages.findOne({_id: mychats2.messageid[i]})
                messages[i] = mens
            }
            res.json(messages)
        }
        if (mychats == null && mychats2 == null){
            res.json(null)
        }
    }
    catch (error){
        console.log(error)
    }
}


exports.putMessageInChat = async (req, res) => {
    try {
        var objectId = mongoose.Types.ObjectId(req.params.id);
        var objectId2 = mongoose.Types.ObjectId(req.params.userid);

        const mychats = await Chats.findOne({userid1: objectId, userid2: objectId2})
        const mychats2 = await Chats.findOne({userid2: objectId2, userid2: objectId})
        if (mychats){
            let messages = new Messages(req.body)
            await messages.save()

            mychats.messageid.push(messages._id)
            mychats.save()
            res.json("Subido con éxito")
        }
        if (mychats2){
            let messages = new Messages(req.body)
            await messages.save()

            mychats2.messageid.push(messages._id)
            mychats2.save()
            res.json("Subido con éxito")
        }
        if (mychats == null && mychats2 == null){ 
            let messages = new Messages(req.body)
            await messages.save()
            if (messages){
                var objectId = mongoose.Types.ObjectId(req.params.id);
                var objectId2 = mongoose.Types.ObjectId(req.params.userid);
    
                var req = {userid1: objectId, userid2: objectId2, messageid: messages._id}
                let chats = new Chats(req)
                await chats.save()
                res.json("Subido con éxito")
            }            
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.deleteMessageInChat = async (req, res) => {
    try {
        var objectId = mongoose.Types.ObjectId(req.params.id);
        var objectId2 = mongoose.Types.ObjectId(req.params.userid);

        const mychats = await Chats.findOne({userid1: objectId, userid2: objectId2})
        const mychats2 = await Chats.findOne({userid2: objectId2, userid2: objectId})
        if (mychats){
            await Messages.findByIdAndRemove({_id: req.params.messageid})

            mychats.messageid.remove(req.params.messageid)
            mychats.save()
            res.json("Eliminado éxito")
        }
        if (mychats2){
            await Messages.findByIdAndRemove({_id: req.params.messageid})

            mychats2.messageid.remove(req.params.messageid)
            mychats2.save()
            res.json("Eliminado con éxito")
        }
    }
    catch (error){
        console.log(error)
    }
}

exports.editMessageInChat = async (req, res) => {
    try {
        await Messages.findByIdAndUpdate(req.params.messageid, req.body)
        res.json("Mensaje actualizado")
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