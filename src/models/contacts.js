const { ObjectId, Timestamp } = require('mongodb');
const {Schema, model} = require('mongoose')

const contactSchema = new Schema(
    {
    userid: {type: ObjectId, required: true},
    userid2: {type: ObjectId, required: true},
    datetime: {type: Timestamp, required: true}
    }
);

module.exports = model("Contacts", contactSchema);