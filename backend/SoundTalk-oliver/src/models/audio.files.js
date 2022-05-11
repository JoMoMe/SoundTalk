const {Schema, model} = require('mongoose')

const audioSchema = new Schema(
    {
    length: {type: Number, required: true},
    chunkSize: {type: String, required: true},
    uploadDate: {type: String, required: true},
    filename: {type: String, required: true},
    }
);

module.exports = model("audio.files", audioSchema);