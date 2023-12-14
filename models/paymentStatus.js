
const mongoose = require('mongoose');

const paymentStatusSchema = new mongoose.Schema({
  name: String,
  phone: String,
  membershipType: String,
  paymentStatus: String,
  amount: Number,
  dateOfJoining: Date,
  dateOfExpiring: Date,
});

const PaymentStatus = mongoose.model('PaymentStatus', paymentStatusSchema);

module.exports = PaymentStatus;
