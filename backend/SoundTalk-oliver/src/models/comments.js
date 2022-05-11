const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const commentSchema = new Schema(
    {
    text: {type: String, required: true},
    audioid: {type: ObjectId, required: false},
    photoid: {type: ObjectId, required: false},
    userid: {type: ObjectId, required: true},
    }
);

module.exports = model("Comments", commentSchema);