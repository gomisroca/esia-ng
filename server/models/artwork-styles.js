const mongoose = require('mongoose');
const { Schema } = mongoose;

const styleSchema = new Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    banner: String,
});

module.exports = mongoose.model('artwork-style', styleSchema);