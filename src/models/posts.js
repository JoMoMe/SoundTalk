const { ObjectId, Int32 } = require('mongodb');
const {Schema, model} = require('mongoose')

const postSchema = new Schema(
    {
    userid: {type: ObjectId, required: true},
    content: {type: String, required: true},
    audioid: {type: String, required: false},
    photoid: {type: String, required: false},
    likes: {type: Number, required: false},
    shares: {type: Number, required: false},
    commentsid: {type: ObjectId, required: false}
    }
);

module.exports = model("Posts", postSchema);