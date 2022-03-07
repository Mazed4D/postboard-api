const { Router } = require('express');
const jwt = require('express-jwt');
const { toggleLike, fetchLikes } = require('../controllers/likes');

const router = Router();

router
	.route('/toggle/:id')
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		toggleLike
	);
router
	.route('/:id')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchLikes
	);

module.exports = router;
