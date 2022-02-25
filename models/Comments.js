const { Schema, Types, model } = require('mongoose');

const CommentSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user ID'],
		},
		post: {
			type: Types.ObjectId,
			ref: 'Post',
			required: [true, 'Please provide post ID'],
		},
		text: {
			type: String,
			required: [true, 'Please provide comment text'],
			maxlength: 140,
		},
	},
	{ timestamps: true }
);

module.exports = model('Comment', CommentSchema);
