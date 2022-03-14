const { Schema, Types, model } = require('mongoose');

const PostSchema = new Schema(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		name: {
			type: String,
			required: [true, 'Please provide name of the user'],
		},
		text: {
			type: String,
			required: [true, 'Please provide post text'],
			maxlength: 280,
		},
	},
	{ timestamps: true }
);

module.exports = model('Post', PostSchema);
