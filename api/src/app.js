require('dotenv').config();

const db = require('./models');

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

const teste = async () => {
	const company = await db.city.findByPk(1, {
		include: db.state
	});
	console.log(company);
};

teste();

//db.apiKey.create({'key': 'dsasdsasdsasdsws'});

//db.company.findById();

//db.company.create({'name': 'dsadsadadsa', 'idApiKey': 1});

module.exports = app;
