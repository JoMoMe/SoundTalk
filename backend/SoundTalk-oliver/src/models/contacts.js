const { ObjectId, Timestamp } = require('mongodb');
const {Schema, model} = require('mongoose')

const contactSchema = new Schema(
    {
    myuserid: {type: ObjectId, required: true},
    userrequestid: {type: ObjectId, required: true},
    status: {type: Number, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("Contacts", contactSchema);