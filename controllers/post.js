const Post = require('../models/Post');

const addPost = async (req, res) => {
	const post = new Post({
		user: req.user.userId,
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
	const posts = await Post.find();
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
