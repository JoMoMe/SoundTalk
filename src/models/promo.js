const { ObjectId } = require('mongodb');
const {Schema, model} = require('mongoose')

const promoSchema = new Schema(
    {
    idpost: {type: ObjectId, required: true},
    dateofpay: {type: Timestamp, required: true},
    expirationtime: {type: Timestamp, required: false},
    }
);

module.exports = model("Promos", promoSchema);