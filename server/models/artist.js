const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const artistSchema = new Schema({
    id: { type: Number, required: true, unique: true, default: uuidv4() },
    title: { type: String, required: true },
    sort_title: { type: String, required: true },
    birth: Number,
    death: Number,
    description: String
});

module.exports = mongoose.model('artist', artistSchema);