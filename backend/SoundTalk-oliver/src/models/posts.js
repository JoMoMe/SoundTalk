const { ObjectId, Int32, Timestamp } = require('mongodb');
const {Schema, model} = require('mongoose')

const postSchema = new Schema(
    {
    title: {type: String, required: true},
    content: {type: String, required: false},
    photoid: {type: String, required: false},
    audioid: {type: String, required: false},
    userid: {type: ObjectId, required: true},
    likes: [{type: ObjectId, required: false}],
    commentsid: [{type: ObjectId, required: false}],
    type: {type: String, required: true},
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("Posts", postSchema);