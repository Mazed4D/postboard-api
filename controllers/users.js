const User = require('../models/User');

const fetchUsers = async (req, res) => {
	console.log('post route');
};

const fetchUserName = async (req, res) => {
	const { name } = await User.findById(req.params.id);
	res.status(200).json({ name });
};

const fetchPost = async (req, res) => {
	console.log('fetch post');
};

const fetchPosts = async (req, res) => {
	console.log('fetch posts');
};

const fetchPostsByUser = async (req, res) => {
	console.log('fetch posts by user');
};

module.exports = {
	fetchUserName,
	fetchUsers,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
};
