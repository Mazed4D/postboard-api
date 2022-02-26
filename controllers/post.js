const addPost = async (req, res) => {
	console.log('post route');
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
	addPost,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
};
