const { ObjectId, Timestamp } = require('mongodb');
const {Schema, model} = require('mongoose')

const promoSchema = new Schema(
    {
    idpost: {type: ObjectId, required: true},
    dateofpay: {type: Number, required: true},
    expirationtime: {type: Number, required: false},
    }
);

module.exports = model("Promos", promoSchema);