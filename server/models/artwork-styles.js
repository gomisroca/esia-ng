const mongoose = require('mongoose');
const { Schema } = mongoose;

const styleSchema = new Schema({
    id: String,
    title: String,
    banner: String,
});

module.exports = mongoose.model('artwork-style', styleSchema);