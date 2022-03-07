const { Router } = require('express');
const {
	fetchUserName,
	fetchUsers,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
} = require('../controllers/users');

const router = Router();

router.route('/:id').get(fetchUserName);

module.exports = router;
