const { ObjectId, Timestamp } = require('mongodb');
const {Schema, model} = require('mongoose')

const chatSchema = new Schema(
    {
    userid1: {type: ObjectId, required: true},
    userid2: {type: ObjectId, required: true},
    messageid: {type: ObjectId, required: true},
    lastmessagetime: {type: Timestamp, required: true}
}
);

module.exports = model("Chats", chatSchema);