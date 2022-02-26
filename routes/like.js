const { Router } = require('express');
const jwt = require('express-jwt');
const { addLike, removeLike, fetchLikes } = require('../controllers/likes');

const router = Router();

router
	.route('/add/:id')
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		addLike
	);
router
	.route('/remove/:id')
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		removeLike
	);
router
	.route('/:id')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchLikes
	);

module.exports = router;
