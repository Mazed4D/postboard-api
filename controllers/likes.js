const { StatusCodes } = require('http-status-codes');
const Like = require('../models/Likes');

const addLike = async (req, res) => {
	const likeObj = {
		post: req.params.id,
		user: req.user.userId,
	};
	const isLike = await Like.findOne(likeObj);
	if (isLike) {
		return res.status(400).json({ msg: 'Already liked' });
	}
	const like = new Like(likeObj);
	const result = await like.save();
	res.status(200).json(result);
};

const removeLike = async (req, res) => {
	const foundLike = await Like.findById(req.params.id);
	if (!foundLike) {
		return res.status(404).json({ msg: 'Like not found' });
	}
	if (foundLike.user != req.user.userId) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' });
	}
	await Like.findByIdAndDelete(req.params.id);
	res.status(200).json({ success: true, msg: 'like removed' });
};

const fetchLikes = async (req, res) => {
	const likes = await Like.find({ post: req.params.id });
	if (!likes) {
		return res
			.status(404)
			.json({ msg: `Post doesn't exist or it has no likes` });
	}
	res.status(200).json(likes);
};

module.exports = {
	addLike,
	removeLike,
	fetchLikes,
};
