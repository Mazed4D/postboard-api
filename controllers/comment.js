const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comments');

const addComment = async (req, res) => {
	const comment = new Comment({
		user: req.user.userId,
		username: req.user.name,
		post: req.params.id,
		text: req.body.text,
	});
	await comment.save();
	res.status(200).json({ msg: 'comment posted' });
};

const editComment = async (req, res) => {
	const isComment = await Comment.findById(req.params.id);
	if (!isComment) {
		return res.status(404).json({ msg: 'comment doesnt exist' });
	}
	if (isComment.user != req.user.userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' });
	}
	const comment = {
		text: req.body.text,
	};
	const editedComment = await Comment.findByIdAndUpdate(
		req.params.id,
		comment,
		{
			new: true,
		}
	);
	res.status(200).json(editedComment);
};

const fetchComments = async (req, res) => {
	const comments = await Comment.find({ post: req.params.id });
	if (!comments) {
		return res.status(404).json({ msg: 'no comments for this post id' });
	}
	res.status(200).json(comments);
};

module.exports = {
	addComment,
	editComment,
	fetchComments,
};
