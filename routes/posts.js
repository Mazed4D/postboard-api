const { Router } = require('express');
const jwt = require('express-jwt');
const {
	addPost,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
	fetchPostsByFollowedUsers,
} = require('../controllers/post');

const router = Router();

router
	.route('/')
	.post(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), addPost)
	.get(fetchPosts);
router
	.route('/followed')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchPostsByFollowedUsers
	);
router
	.route('/:id')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchPost
	);
router
	.route('/user/:id')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchPostsByUser
	);

module.exports = router;
