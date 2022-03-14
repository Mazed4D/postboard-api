const Picture = require('../models/Picture');
const path = require('path');
const { UnauthorizedError } = require('express-jwt/lib');

const addProfilePicture = async (req, res) => {
	const { userId } = req.params;
	const profilePicture = req.files.profilePicture;
	const uploadPath = path.join(
		__dirname +
			'/../' +
			'/public/' +
			'/uploads/' +
			userId +
			'.' +
			profilePicture.name.split('.')[1]
	);
	if (req.user.userId !== userId) {
		throw UnauthorizedError;
	}

	const picture = new Picture({
		user: userId,
		picture: userId + '.' + profilePicture.name.split('.')[1],
	});
	profilePicture.mv(uploadPath, async (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		const existingPicture = await Picture.findOne({ user: userId });
		if (existingPicture) {
			await Picture.findOneAndRemove({ user: userId });
		}
		await picture.save();
	});
	res.status(200).json({ msg: 'Upload success' });
};

const fetchProfilePicture = async (req, res) => {
	const userId = req.params.userId;
	const picture = await Picture.findOne({ user: userId });
	res.status(200).json({ url: picture.picture });
};

module.exports = {
	addProfilePicture,
	fetchProfilePicture,
};
