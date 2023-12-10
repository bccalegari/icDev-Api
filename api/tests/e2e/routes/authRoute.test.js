const { describe, test, expect, beforeAll } = require('@jest/globals');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../src/app');
const Company = require('../../../src/models/index').company;
const ApiKey = require('../../../src/models/index').apiKey;
const DataBuilder = require('../../utils/DataBuilder');

describe('POST on /auth/signupAuth', () => {

	test('signupAuth_ValidCompanyCode_ReturningRegisterToken', async () => {

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

describe('POST on /auth/signup/:companyId', () => {

	describe('signupAuthMiddleware', () => {

		test('signupAuthMiddleware_RegisterTokenNull_ThrowingUnauthorizedApiErrorException', async () => {
	
			const company = await Company.findByPk(1);
		
			const response = await chai.request(app)
				.post(`/auth/signup/${company.idCompany}`)
				.set('Accept', 'application/json')
				.send({});
		
			expect(response).toBeDefined();
		
			expect(response).not.toBeNull();
		
			expect(response.statusCode).toBe(401);
		
			expect(response.body).toEqual(expect.objectContaining({
				message: 'Register token is required',
			}));
		
		});
		
		test('signupAuthMiddleware_RegisterTokenInvalid_ThrowingUnauthorizedApiErrorException', async () => {
		
			const company = await Company.findByPk(1);
		
			const response = await chai.request(app)
				.post(`/auth/signup/${company.idCompany}`)
				.set('Accept', 'application/json')
				.set('Authorization', `registerToken ${DataBuilder.randomString()}`)
				.send({});
		
			expect(response).toBeDefined();
		
			expect(response).not.toBeNull();
		
			expect(response.statusCode).toBe(401);
		
			expect(response.body).toEqual(expect.objectContaining({
				message: 'Invalid register token',
			}));
		
		});
	
		test('signupAuthMiddleware_CompanyCodeNotFound_ThrowingUnauthorizedApiErrorException', async () => {
		
			const response = await chai.request(app)
				.post(`/auth/signup/${DataBuilder.randomInteger(2)}`)
				.set('Accept', 'application/json')
				.set('Authorization', `registerToken ${DataBuilder.randomString()}`)
				.send({});
		
			expect(response).toBeDefined();
		
			expect(response).not.toBeNull();
		
			expect(response.statusCode).toBe(401);
		
			expect(response.body).toEqual(expect.objectContaining({
				message: 'Invalid register token',
			}));
		
		});
	
		test('signupAuthMiddleware_CompanyCodeNotMatchRegisterToken_ThrowingUnauthorizedApiErrorException', async () => {
	
			const registerTokenCompany = await Company.findByPk(1);
	
			const registerToken = await chai.request(app)
				.post('/auth/signupAuth')
				.set('Accept', 'application/json')
				.send({ companyCode: registerTokenCompany.code });
	
			const apiKey = await ApiKey.create({ key: DataBuilder.randomString(16) });
	
			const requestCompany = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: apiKey.idApiKey });
		
			const response = await chai.request(app)
				.post(`/auth/signup/${requestCompany.idCompany}`)
				.set('Accept', 'application/json')
				.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
				.send({});
		
			expect(response).toBeDefined();
		
			expect(response).not.toBeNull();
		
			expect(response.statusCode).toBe(401);
		
			expect(response.body).toEqual(expect.objectContaining({
				message: 'Invalid register token',
			}));
		
		});
	
	});

	let registerToken;

	beforeAll(async () => {

		const company = await Company.findByPk(1);

		registerToken = await chai.request(app)
			.post('/auth/signupAuth')
			.set('Accept', 'application/json')
			.send({ companyCode: company.code });
		
	});

	test('signup_ValidCompanyIdAndValidUserData_ReturningUserCreated', async () => {

		const company = await Company.findByPk(1);

		const userToBeCreated = {
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			login: DataBuilder.randomString(20),
			password: DataBuilder.randomString(12),
			cpf: DataBuilder.randomString(11),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
			city: 'Test City',
		};

		const response = await chai.request(app)
			.post(`/auth/signup/${company.idCompany}`)
			.set('Accept', 'application/json')
			.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
			.send(userToBeCreated);

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(201);

		expect(response.body).toEqual(expect.objectContaining({
			name: userToBeCreated.name,
			lastName: userToBeCreated.lastName,
			login: userToBeCreated.login,
			cpf: userToBeCreated.cpf,
			street: userToBeCreated.street,
			streetNumber: userToBeCreated.streetNumber,
			district: userToBeCreated.district,
			city: userToBeCreated.city,
			birthDate: userToBeCreated.birthDate.toISOString().substring(0, 10),
			phone: userToBeCreated.phone,
			email: userToBeCreated.email,
			company: company.name,
			createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
		}));
	
	});

	test('signup_UserDataNull_ThrowingBadRequestApiErrorException', async () => {

		const company = await Company.findByPk(1);

		const response = await chai.request(app)
			.post(`/auth/signup/${company.idCompany}`)
			.set('Accept', 'application/json')
			.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
			.send({});

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'User data is required',
		}));

	});

	test('signup_PasswordNull_ThrowingBadRequestApiErrorException', async () => {

		const company = await Company.findByPk(1);

		const userToBeCreated = {
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			login: DataBuilder.randomString(20),
			cpf: DataBuilder.randomString(11),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
			city: 'Test City',
		};

		const response = await chai.request(app)
			.post(`/auth/signup/${company.idCompany}`)
			.set('Accept', 'application/json')
			.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
			.send(userToBeCreated);

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'Password is required',
		}));

	});

	test('signup_CityNull_ThrowingBadRequestApiErrorException', async () => {

		const company = await Company.findByPk(1);

		const userToBeCreated = {
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			login: DataBuilder.randomString(20),
			password: DataBuilder.randomString(12),
			cpf: DataBuilder.randomString(11),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
		};

		const response = await chai.request(app)
			.post(`/auth/signup/${company.idCompany}`)
			.set('Accept', 'application/json')
			.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
			.send(userToBeCreated);

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'City is required',
		}));

	});

	test('signup_CityInvalid_ThrowingBadRequestApiErrorException', async () => {

		const company = await Company.findByPk(1);

		const userToBeCreated = {
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			login: DataBuilder.randomString(20),
			password: DataBuilder.randomString(12),
			cpf: DataBuilder.randomString(11),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
			city: DataBuilder.randomString(50)
		};

		const response = await chai.request(app)
			.post(`/auth/signup/${company.idCompany}`)
			.set('Accept', 'application/json')
			.set('Authorization', `registerToken ${registerToken.body.registerToken}`)
			.send(userToBeCreated);

		expect(response).toBeDefined();

		expect(response).not.toBeNull();

		expect(response.statusCode).toBe(400);

		expect(response.body).toEqual(expect.objectContaining({
			message: 'Invalid city name',
		}));

	});

});
