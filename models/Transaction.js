const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Please add a transaction name'],
	},
	type: {
		type: String,
		trim: true,
		required: false,
		default: 'Card',
	},
	category: {
		type: String,
		trim: true,
		required: false,
		default: 'General',
	},
	amount: {
		type: Number,
		required: [true, 'Please add a transaction amount'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Transaction', TransactionSchema);
