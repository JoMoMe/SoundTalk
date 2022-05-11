const {Schema, model} = require('mongoose')

const photoSchema = new Schema(
    {
    filepath: {type: Object, required: true}
    }
);

module.exports = model("Photos", photoSchema);