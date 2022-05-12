const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const likeSchema = new Schema(
    {
    userid: {type: ObjectId, required: true}
    }
);

module.exports = model("likes", likeSchema);