const { Schema, Types, model } = require('mongoose');

const CommentSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user ID'],
		},
		username: {
			type: String,
			required: [true, 'Please provide user'],
			maxlength: 100,
		},
		post: {
			type: Types.ObjectId,
			ref: 'Post',
			required: [true, 'Please provide post ID'],
		},
		text: {
			type: String,
			required: [true, 'Please provide comment text'],
			maxlength: 280,
		},
	},
	{ timestamps: true }
);

module.exports = model('Comment', CommentSchema);
