const { describe, test, expect } = require('@jest/globals');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../src/app');
const Company = require('../../../src/models/index').company;
const DataBuilder = require('../../utils/DataBuilder');

describe('POST on /auth/signupAuth', () => {

	test('signupAuth_ReturningRegisterToken_True', async () => {

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

	test('signupAuth_CompanyCodeNull_ThrowingBadRequestApiErrorException', async () => {

		const response = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({});

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'Company code is required',
		}));

	});

	test('signupAuth_CompanyCodeDifferentFromTheExactLength_ThrowingBadRequestApiErrorException', async () => {

		const response = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({ companyCode: DataBuilder.randomString(17) });

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'Company code must be 16 characters long'
		}));

	});

	test('signupAuth_CompanyCodeNotFound_ThrowingNotFoundApiErrorException', async () => {

		const response = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({ companyCode: DataBuilder.randomString(16) });

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(404);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'Invalid company code',
		}));

	});

});
