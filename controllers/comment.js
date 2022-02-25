const addComment = async (req, res) => {
	res.send('add comment');
};

const editComment = async (req, res) => {
	res.send('edit comment');
};

const fetchComments = async (req, res) => {
	res.send('fetch comments');
};

module.exports = {
	addComment,
	editComment,
	fetchComments,
};
