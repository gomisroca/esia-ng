const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: String,
  icon: String,
});

const discordSchema = new Schema({
  id: String,
  tag: String,
  name: String,
  avatar: String,
  roles: [roleSchema],
  combined: { type: Boolean, default: false}
});


module.exports = mongoose.model('discord', discordSchema);