const { beforeAll, afterAll } = require('@jest/globals');
const sequelize = require('../../models/index').sequelize;

beforeAll(async () => {
	await sequelize.sync();
});

afterAll(async() => {
	await sequelize.close();
});