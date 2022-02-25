const { Schema, Types, model } = require('mongoose');

const PostSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		text: {
			type: String,
			required: [true, 'Please provide post text'],
			maxlength: 280,
		},
		likes: {
			type: [Types.ObjectId],
			ref: 'User',
		},
		comments: [{ body: String, type: [Types.ObjectId], ref: 'User' }],
	},
	{ timestamps: true }
);

module.exports = model('Post', PostSchema);