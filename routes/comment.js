const { Router } = require('express');
const jwt = require('express-jwt');
const {
	addComment,
	editComment,
	fetchComments,
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
	.route('/:id')
	.patch(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		editComment
	);

module.exports = router;
