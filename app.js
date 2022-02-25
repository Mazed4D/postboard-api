// base imports
const express = require('express');
const path = require('path');

//constants
const port = process.env.PORT || 3000;

// app
const app = express();

// non-const imports
require('dotenv').config();

// package imports
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// other imports
const connectDB = require('./database/connect');

// router imports
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/users', usersRouter);

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
