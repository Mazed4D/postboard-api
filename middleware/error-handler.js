const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later',
	};

	console.log(err.name);
	if (err.name === 'UnauthorizedError') {
		customError.msg = 'Invalid token';
		customError.statusCode = 401;
	} else if (err.name === 'CastError') {
		customError.msg = `No item found with id of ${err.value}`;
		customError.statusCode = 404;
	} else if ((err.name = 'ValidationError')) {
		customError.msg = err.keyPattern;
		customError.statusCode = 400;
	} else if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		customError.statusCode = 400;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
