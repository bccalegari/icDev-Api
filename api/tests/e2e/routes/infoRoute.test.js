const { describe, expect, beforeAll, test } = require('@jest/globals');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../../src/app');
const DataBuilder = require('../../utils/DataBuilder');
const Company = require('../../../src/models/index').company;
const User = require('../../../src/models/index').user;
const City = require('../../../src/models/index').city;

describe('Info routes', () => {

	let accessToken;
	let company;
	let user;

	beforeAll(async () => {

		company = await Company.findByPk(1);

		user = await User.findByPk(1);

		const accessTokenResponse = await chai.request(app)
			.post('/v1/auth/signin')
			.set('Accept', 'application/json')
			.send({ login: user.login, password: '123' });

		accessToken = accessTokenResponse.body.accessToken;

	});

	describe('GET on /v1/info/cities', () => {

		describe('infoAuthHandler', () => {

			test('infoAuthHandler_RegisterAndAccessTokenNull_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/info/cities')
					.set('company-id', company.idCompany)
					.set('Accept', 'application/json');
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Register or Access token is required',
				}));
		
			});

			test('infoAuthHandler_InvalidTokenName_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/info/cities')
					.set('company-id', company.idCompany)
					.set('Accept', 'application/json')
					.set('Authorization', `${DataBuilder.randomString(12)} ${DataBuilder.randomString()}`);
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Invalid token name',
				}));
		
			});

			test('infoAuthHandler_RegisterTokenInvalid_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/info/cities')
					.set('company-id', company.idCompany)
					.set('Accept', 'application/json')
					.set('Authorization', `registerToken ${DataBuilder.randomString()}`);
		
				expect(response).toBeDefined();
		
				expect(response).not.toBeNull();
		
				expect(response.statusCode).toBe(401);
		
				expect(response.body).toEqual(expect.objectContaining({
					message: 'Invalid register token',
				}));
		
			});

			test('infoAuthHandler_AccessTokenInvalid_ThrowingUnauthorizedApiErrorException', async () => {
		
				const response = await chai.request(app)
					.get('/v1/info/cities')
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
        
		});

		test('listAllCities_ValidRequest_ReturningAllCitiesPaginated', async () => {

			const response = await chai.request(app)
				.get('/v1/info/cities')
				.set('company-id', company.idCompany)  
				.set('Authorization', `accessToken ${accessToken}`);

			expect(response).toBeDefined();

			expect(response).not.toBeNull();
    
			expect(response.statusCode).toBe(200);

			expect(response.body).toHaveLength(50); // Default page size
    
			expect(response.body[0]).toEqual(expect.objectContaining({
				city: expect.any(String),
				state: expect.objectContaining({
					name: expect.any(String),
					isoAlpha2: expect.any(String),
				}),
				country: expect.objectContaining({
					name: expect.any(String),
					isoAlpha2: expect.any(String),
					isoAlpha3: expect.any(String),
				}),
			}));

		});

		test('listAllCities_SearchByName_ReturningAllCitiesWithSimilarNamesPaginated', async () => {

			const city = await City.findByPk(1);
	
			const response = await chai.request(app)
				.get(`/v1/info/cities?city=${city.name}`)
				.set('company-id', company.idCompany) 
				.set('Authorization', `accessToken ${accessToken}`);
	
			expect(response).toBeDefined();
	
			expect(response).not.toBeNull();
	
			expect(response.statusCode).toBe(200);
	
			expect(response.body[0]).toEqual(expect.objectContaining({
				city: expect.stringMatching(city.name),
				state: expect.objectContaining({
					name: expect.any(String),
					isoAlpha2: expect.any(String),
				}),
				country: expect.objectContaining({
					name: expect.any(String),
					isoAlpha2: expect.any(String),
					isoAlpha3: expect.any(String),
				}),
			}));
	
		});
	
		test('listAllCities_Paging_ReturningAllCitiesPaginatedAccordingToOffset', async () => {
	
			const responseWithoutPagination = await chai.request(app)
				.get('/v1/info/cities')
				.set('company-id', company.idCompany) 
				.set('Authorization', `accessToken ${accessToken}`);
	
			const responseWithPagination = await chai.request(app)
				.get('/v1/info/cities?offset=1')
				.set('company-id', company.idCompany) 
				.set('Authorization', `accessToken ${accessToken}`);
	
			expect(responseWithPagination).toBeDefined();
	
			expect(responseWithPagination).not.toBeNull();
	
			expect(responseWithPagination.statusCode).toBe(200);
	
			expect(responseWithoutPagination.body[0]).not.toEqual(responseWithPagination.body[0]);
	
		});

	});

	describe('GET on /v1/info/unit-types', () => {
		
		test('listAllUnitTypes_ValidRequest_ReturningAllUnitTypes', async () => {

			const response = await chai.request(app)
				.get('/v1/info/unit-types')
				.set('company-id', company.idCompany) 
				.set('Authorization', `accessToken ${accessToken}`);

			expect(response).toBeDefined();

			expect(response).not.toBeNull();

			expect(response.statusCode).toBe(200);

			expect(response.body[0]).toEqual(expect.objectContaining({
				name: expect.any(String)
			}));

		});

	});

});
