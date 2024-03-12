const mongoose = require('mongoose');
const { Schema } = mongoose;

const artworkSchema = new Schema({
    id: Number,
    title: String,
    artist_id: Number,
    artist: String,
    medium: String,
    date: String,
    origin: String,
    style_id: String,
    style: String,
    thumbnail: String,
    fullImage: String,
    price: Number,
    amount: Number,
});

module.exports = mongoose.model('artwork', artworkSchema);