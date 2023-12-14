const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  salary: Number,
  category: String,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
