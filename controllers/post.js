const Post = require('../models/Post');
const Followed = require('../models/Followed');
const { StatusCodes } = require('http-status-codes');

const addPost = async (req, res) => {
	console.log(req.body);
	const post = new Post({
		user: req.user.userId,
		name: req.user.name,
		text: req.body.text,
	});
	const result = await post.save();
	res.json(result);
};

const fetchPost = async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.status(200).json(post);
};

const fetchPosts = async (req, res) => {
	const query = req.query;
	const page = query.page || 1;
	const skipNum = page * 4 - 4;
	const posts = await Post.find().sort('-createdAt').skip(skipNum).limit(4);
	const totalPosts = await Post.countDocuments();
	const postIds = posts.map((post) => post.id);
	res.json({ postIds, totalPosts });
};

const fetchPostsByUser = async (req, res) => {
	const query = req.query;
	const page = query.page || 1;
	const skipNum = page * 4 - 4;
	const posts = await Post.find({ user: req.params.id })
		.sort('-createdAt')
		.skip(skipNum)
		.limit(4);
	const totalPosts = await Post.countDocuments({ user: req.params.id });
	const postIds = posts.map((post) => post.id);
	res.status(200).json({ postIds, totalPosts });
};

const fetchPostsByFollowedUsers = async (req, res) => {
	const query = req.query;
	const page = query.page || 1;
	const skipNum = page * 4 - 4;
	const { follows } = await Followed.findOne({ user: req.user.userId });
	const posts = await Post.find({ user: { $in: follows } })
		.sort('-createdAt')
		.skip(skipNum)
		.limit(4);
	const totalPosts = await Post.countDocuments({ user: { $in: follows } });
	const postIds = posts.map((post) => post.id);
	res.json({ postIds, totalPosts });
};

const deletePost = async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post.user !== req.user.userId) {
		return res.status(401).json({ msg: 'unauthorized' });
	}
	await Post.findByIdAndDelete(req.params.id);
	res.status(200).json({ msg: 'deleted' });
};

module.exports = {
	addPost,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
	fetchPostsByFollowedUsers,
	deletePost,
};
