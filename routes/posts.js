const { Router } = require('express');
const {
	addPost,
	fetchPost,
	fetchPosts,
	fetchPostsByUser,
} = require('../controllers/post');

const router = Router();

router.route('/').post(addPost).get(fetchPosts);
router.route('/:id').get(fetchPost);
router.route('/user/:id').get(fetchPostsByUser);

module.exports = router;
