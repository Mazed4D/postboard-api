const { Schema, Types, model } = require('mongoose');

const FollowedSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user ID'],
	},
	follows: [
		{
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide followed user ID'],
		},
	],
});

module.exports = model('Followed', FollowedSchema);
