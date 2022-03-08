const Post = require('../models/Post');

const addPost = async (req, res) => {
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
	res.json(posts);
};

const fetchPostsByUser = async (req, res) => {
	const posts = await Post.find({ user: req.params.id });
	res.status(200).json(posts);
};

module.exports = {
	addPost,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
};
