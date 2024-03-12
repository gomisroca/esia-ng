const mongoose = require('mongoose');
const { Schema } = mongoose;

const exhibitionSchema = new Schema({
    id: Number,
    title: String,
    image: String,
    url: String,
    start: String,
    end: String,
    description: String,
    gallery: String,
    ticket_price: Number,
    ticket_amount: Number,
});

module.exports = mongoose.model('exhibition', exhibitionSchema);