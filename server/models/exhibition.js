const mongoose = require('mongoose');
const { Schema } = mongoose;

const exhibitionSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
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