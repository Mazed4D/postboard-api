// base imports
const express = require('express');
const path = require('path');

//constants
const port = process.env.PORT || 3000;

// app
const app = express();

// non-const imports
require('dotenv').config();
require('express-async-errors');

// package imports
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// other imports
const connectDB = require('./database/connect');

// router imports
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts.js');
const likesRouter = require('./routes/like');
const commentsRouter = require('./routes/comment');

// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// security middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({ windowsMs: 60 * 1000, max: 60 }));

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/likes', likesRouter);
app.use('/api/v1/comments', commentsRouter);

// error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start func
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log('Database connected');
		app.listen(port);
	} catch (err) {
		console.log(err);
		process.exit();
	}
};

start();
