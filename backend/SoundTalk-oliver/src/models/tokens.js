const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const tokenSchema = new Schema(
    {
    token: {type: String, required: true},
    user_id: {type: ObjectId, required: true},
    }
);

module.exports = model("Tokens", tokenSchema);