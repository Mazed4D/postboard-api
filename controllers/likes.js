const addLike = async (req, res) => {
	res.send('add like');
};

const removeLike = async (req, res) => {
	res.send('remove like');
};

const fetchLikes = async (req, res) => {
	res.send('fetch likes');
};

module.exports = {
	addLike,
	removeLike,
	fetchLikes,
};
