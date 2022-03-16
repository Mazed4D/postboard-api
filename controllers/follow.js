const Followed = require('../models/Followed');

const toggleFollowUser = async (req, res) => {
	const { userId } = req.params;
	const followListExists = await Followed.findOne({ user: req.user.userId });
	if (followListExists) {
		if (followListExists.follows.find((user) => user == userId)) {
			followListExists.follows = followListExists.follows.filter(
				(user) => user != userId
			);
			await followListExists.save();
			return res.status(200).json({ msg: 'unfollowed' });
		}
		followListExists.follows.push(userId);
		await followListExists.save();
		return res.status(200).json(followListExists);
	}
	const newFollowed = new Followed({
		user: req.user.userId,
		follows: [userId],
	});
	await newFollowed.save();
	res.status(200).json({ msg: 'success' });
};

const fetchFollowedUsers = async (req, res) => {
	const followedList = await Followed.findOne({ user: req.user.userId });
	const { follows } = followedList;
	res.status(200).json(follows);
};

const fetchFollowedStatus = async (req, res) => {
	const { userId } = req.params;
	const followListExists = await Followed.findOne({ user: req.user.userId });
	if (followListExists) {
		if (followListExists.follows.find((user) => user == userId)) {
			return res.status(200).json({ isFollowed: true });
		}
	}
	res.status(200).json({ isFollowed: false });
};

module.exports = {
	toggleFollowUser,
	fetchFollowedUsers,
	fetchFollowedStatus,
};
