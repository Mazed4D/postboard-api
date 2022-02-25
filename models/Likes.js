const { Schema, Types, model } = require('mongoose');

const LikesSchema = new Schema({
	post: {
		type: Types.ObjectId,
		ref: 'Post',
		required: [true, 'Please provide post ID'],
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user ID'],
	},
});

module.exports = model('Likes', LikesSchema);
