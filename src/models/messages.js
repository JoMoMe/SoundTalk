const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const messageSchema = new Schema(
    {
    text: {type: String, required: true},
    audioid: {type: ObjectId, required: false},
    photoid: {type: ObjectId, required: false}
    }
);

module.exports = model("Messages", messageSchema);