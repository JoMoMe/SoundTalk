const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const messageSchema = new Schema(
    {
    text: {type: String, required: true},
    userid: {type: ObjectId, required: true},
    audioid: {type: ObjectId, required: false},
    photoid: {type: ObjectId, required: false}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("Messages", messageSchema);