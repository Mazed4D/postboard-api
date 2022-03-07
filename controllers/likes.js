const { StatusCodes } = require('http-status-codes');
const Like = require('../models/Likes');

const toggleLike = async (req, res) => {
	const likeObj = {
		post: req.params.id,
		user: req.user.userId,
	};
	const isLike = await Like.findOne(likeObj);
	if (isLike) {
		await Like.findOneAndDelete({
			post: req.params.id,
			user: req.user.userId,
		});
		return res.status(204).json({});
	}
	const like = new Like(likeObj);
	const result = await like.save();
	res.status(200).json(result);
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
	toggleLike,
	fetchLikes,
};
