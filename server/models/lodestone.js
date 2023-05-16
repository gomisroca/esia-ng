const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: String,
  icon: String,
});
const lodestoneSchema = new Schema({
    id: Number,
    name: String,
    avatar: String,
    rank: roleSchema,
    alt: { type: Boolean, default: false},
    linkedDC:{ type: mongoose.Schema.Types.ObjectId, ref: "discord"},
    portfolio: Boolean,
    comment: String,
  });
  
module.exports = mongoose.model('lodestone', lodestoneSchema);