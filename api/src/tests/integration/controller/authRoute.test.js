const { describe, test, expect } = require('@jest/globals');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../app');
const Company = require('../../../models/index').company;
const DataBuilder = require('../../utils/DataBuilder');

describe('Auth Route Integration Tests', () => {

	test('POST on /auth/signupAuth being valid must return a register token', async () => {

		const company = await Company.findByPk(1);

		const response = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({ companyCode: company.code });

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(200);

		expect(response.body).toEqual(expect.objectContaining({
			registerToken: expect.any(String),
		}));

	});

	test('POST on /auth/signupAuth being invalid must return an 404 error', async () => {

		const response = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({ companyCode: DataBuilder.randomString(16) });

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(404);

		expect(response.body).toEqual(expect.objectContaining({
			message: expect.any(String),
		}));

	});

});
