const { Router } = require('express');
const jwt = require('express-jwt');
const {
	addProfilePicture,
	fetchProfilePicture,
} = require('../controllers/upload');

const router = Router();

router
	.route('/user/:userId')
	.post(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		addProfilePicture
	)
	.get(
		jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
		fetchProfilePicture
	);

module.exports = router;
