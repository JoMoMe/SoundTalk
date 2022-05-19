const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
    username: {type: String, required: true},
    password: {type: String, required: true},
    mail: {type: String, required: true},
    ubication: {type: String, required: false},
    photoid: {type: ObjectId, required: false},
    gender: {type: String, required: false},
    status: {type: String, required: false},
    biography: {type: String, required: false},
    accountactive: {type: Number, required: true},
    contactsid: [{type: ObjectId, required: false}],
    requestsid: [{type: ObjectId, required: false}],
    postsid: {type: ObjectId, required: false},
    role: {type: String, required: true}
    }
);

module.exports = model("Users", userSchema);
