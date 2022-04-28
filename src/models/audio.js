const {Schema, model} = require('mongoose')

const audioSchema = new Schema(
    {
    uploaddate: {type: String, required: true},
    length: {type: Number, required: true},
    filename: {type: String, required: true}
    }
);

module.exports = model("Audios", audioSchema);