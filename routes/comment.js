const { Router } = require('express');
const {
	addComment,
	editComment,
	fetchComments,
} = require('../controllers/comment');

const router = Router();

router.route('/post/:postId').get(fetchComments).post(addComment);
router.route('/:id').patch(editComment);

module.exports = router;
