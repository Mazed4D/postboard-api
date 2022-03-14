const { Schema, Types, model } = require('mongoose');

const PictureSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user ID'],
	},
	picture: {
		type: String,
		required: [true, 'Please provide picture filename'],
	},
});

module.exports = model('Picture', PictureSchema);
