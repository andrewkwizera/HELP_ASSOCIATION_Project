const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  amount: Number,
  txnType: { type: String, enum: ['CR', 'DR'] },
  narration: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Transaction',TransactionSchema)