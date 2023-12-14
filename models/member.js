const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  membershipType: String,
});

module.exports = mongoose.model('Member', memberSchema);
