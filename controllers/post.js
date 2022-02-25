const post = async (req, res) => {
	console.log('post route');
};

const fetchPosts = async (req, res) => {
	console.log('fetch posts');
};

const fetchPostsByUser = async (req, res) => {
	console.log('fetch posts by user');
};

module.exports = {
	post,
	fetchPosts,
	fetchPostsByUser,
};
