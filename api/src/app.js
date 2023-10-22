require('dotenv').config();

const db = require('./models/index');

const express = require('express');

const app = express();
app.use(express.json());

const test = async () => {
	try {
		await db.sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

test();

module.exports = app;
