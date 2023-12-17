const { describe, expect, beforeAll, test } = require('@jest/globals');
const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const app = require('../../../src/app');
const DataBuilder = require('../../utils/DataBuilder');
const Company = require('../../../src/models/index').company;
const ApiKey = require('../../../src/models/index').apiKey;
const User = require('../../../src/models/index').user;

describe('Company routes', () => {

	let accessToken;
	let company;
	let user;

	beforeAll(async () => {

		company = await Company.findByPk(1);

		user = await User.findByPk(1);

		const response = await chai.request(app)
			.post('/v1/auth/signin')
			.set('Accept', 'application/json')
			.send({ login: user.login, password: '123' });

		accessToken = response.body.accessToken;

	});

	describe('GET on /v1/company', () => {

		describe('signInAuthMiddleware', () => {

			test('signInAuthMiddleware_AccessTokenNull_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/company')
					.set('company-id', company.idCompany)
					.set('Accept', 'application/json');
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Access token is required',
				}));
		
			});

			test('signInAuthMiddleware_AccessTokenInvalid_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/company')
					.set('company-id', company.idCompany)
					.set('Accept', 'application/json')
					.set('Authorization', `accessToken ${DataBuilder.randomString()}`);
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Invalid access token',
				}));
		
			});

			test('signInAuthMiddleware_CompanyIdNotFound_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/company')
					.set('company-id', DataBuilder.randomInteger(1))
					.set('Accept', 'application/json')
					.set('Authorization', `accessToken ${accessToken}`);
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Invalid access token',
				}));
		
			});

			test('signInAuthMiddleware_CompanyIdNotMatch_ThrowingUnauthorizedApiErrorException', async () => {

				const newApiKey = await ApiKey.create({ key: DataBuilder.randomString(16) });
	
				const newCompany = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: newApiKey.idApiKey });

				const response = await chai.request(app)
					.get('/v1/company')
					.set('company-id', newCompany.idCompany)
					.set('Accept', 'application/json')
					.set('Authorization', `accessToken ${accessToken}`);
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Invalid access token',
				}));

				await newCompany.destroy();

				await newApiKey.destroy();
		
			});

        
		});

		describe('roleMiddleware', () => {

			test('roleMiddleware_UserHasNoRequiredRole_ThrowingForbiddenApiErrorException', async () => {

				const newUserPassword = DataBuilder.randomString(12);

				const newUserPasswordHash = await bcrypt.hash(newUserPassword, 10);

				const newUser = await User.create({
					name: DataBuilder.randomString(50),
					lastName: DataBuilder.randomString(50),
					login: DataBuilder.randomString(12),
					password: newUserPasswordHash,
					cpf: DataBuilder.randomString(11),
					street: DataBuilder.randomString(150),
					streetNumber: DataBuilder.randomInteger(),
					district: DataBuilder.randomString(150),
					birthDate: DataBuilder.randomDate(),
					phone: DataBuilder.randomString(14),
					email: DataBuilder.randomEmail(),
					idCity: 1,
					idCompany: company.idCompany,
				}, {
					createdBy: 1
				});

				const newUserAccessTokenResponse = await chai.request(app)
					.post('/v1/auth/signin')
					.set('Accept', 'application/json')
					.send({ login: newUser.login, password: newUserPassword });

				const response = await chai.request(app)
					.get('/v1/company')
					.set('company-id', newUser.idCompany)
					.set('Accept', 'application/json')
					.set('Authorization', `accessToken ${newUserAccessTokenResponse.body.accessToken}`);

				expect(response).toBeDefined();

				expect(response).not.toBeNull();

				expect(response.statusCode).toBe(403);

				expect(response.body).toEqual(expect.objectContaining({
					message: 'User is not authorized to perform this action',
				}));

				await newUser.destroy({
					force: true
				});

			});

		});

		test('getUserCompany_ValidRequest_ReturningUserCompanyData', async () => {

			const userCompanyApiKey = await company.getApiKey();

			const response = await chai.request(app)
				.get('/v1/company')
				.set('company-id', company.idCompany)  
				.set('Authorization', `accessToken ${accessToken}`);

			expect(response).toBeDefined();

			expect(response).not.toBeNull();
    
			expect(response.statusCode).toBe(200);
    
			expect(response.body).toEqual(expect.objectContaining({
				idCompany: company.idCompany,
				name: company.name,
				code: company.code,
				apiKey: userCompanyApiKey.key,
			}));

		});

	});

	describe('PUT on /v1/company/apikey/new', () => {

		test('newApiKey_ValidRequest_ReturningNewUserCompanyApiKeyData', async () => {

			const userCompanyApiKey = await company.getApiKey();

			const response = await chai.request(app)
				.put('/v1/company/apikey/new')
				.set('company-id', company.idCompany)  
				.set('Authorization', `accessToken ${accessToken}`);

			expect(response).toBeDefined();

			expect(response).not.toBeNull();
	
			expect(response.statusCode).toBe(200);
	
			expect(response.body).toEqual(expect.objectContaining({
				key: expect.any(String)
			}));

			expect(response.body.key).not.toEqual(userCompanyApiKey.key);

			const newApiKey = await ApiKey.findOne({where: {key: response.body.key}});

			await newApiKey.update({key: userCompanyApiKey.key});

		});

	});

});
