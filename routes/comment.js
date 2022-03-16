const { Router } = require('express');
const jwt = require('express-jwt');
const {
	addComment,
	editComment,
	fetchComments,
	deleteComment,
} = require('../controllers/comment');

const router = Router();

router
	.route('/post/:id')
	.get(fetchComments)
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		addComment
	);
router
	.route('/:commentId')
	.patch(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		editComment
	)
	.delete(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		deleteComment
	);

module.exports = router;
