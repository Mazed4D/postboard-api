const { Router } = require('express');
const jwt = require('express-jwt');
const {
	toggleFollowUser,
	fetchFollowedUsers,
	fetchFollowedStatus,
	fetchFollowCount,
} = require('../controllers/follow');

const router = Router();

router
	.route('/:userId')
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		toggleFollowUser
	)
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchFollowedStatus
	);

router
	.route('/:userId/followCount')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchFollowCount
	);

router
	.route('/followed')
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchFollowedUsers
	);

module.exports = router;
