const { describe, test, expect, afterAll, beforeAll } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const Company = require('../../../src/models').company;
const ApiKey = require('../../../src/models').apiKey;

describe('Company Model Unit Tests', () => {

	let testApiKey;

	beforeAll(async () => {
		testApiKey = await ApiKey.create({ key: DataBuilder.randomString(16) });
	});

	afterAll(async () => {
		return await testApiKey.destroy();
	});

	test('isCompany_BeingSelected_True', async () => {

		const company = await Company.findByPk(1);

		expect(company).not.toBeNull();

		expect(company).toEqual(expect.objectContaining({
			idCompany: expect.any(Number),
			name: expect.any(String),
			code: expect.any(String),
			idApiKey: expect.any(Number)
		}));

	});

	test('isCompany_BeingSaved_True', async () => {

		const company = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });
		expect(company).not.toBeNull();
		await company.destroy();

	});

	test('isCompany_SequenceUp_True', async () => {

		const companies = await Company.findAll();
		const lastCompany = companies.pop();

		const company = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });
		expect(company.idCompany).toBeGreaterThan(lastCompany.idCompany);

		await company.destroy();
		
	});

	test('isCompany_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString();

		const companyBeforeUpdate = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });
		const companyAfterUpdate = await companyBeforeUpdate.update({ name: newName });

		expect(companyAfterUpdate.name).toBe(newName);
		await companyAfterUpdate.destroy();

	});

	test('isCompany_BeingDeleted_True', async () => {

		const companyBeforeDelete = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });
		await companyBeforeDelete.destroy();

		const companyAfterDelete = await Company.findByPk(companyBeforeDelete.idCompany);
		expect(companyAfterDelete).toBe(null);

	});

	test('isCompanyValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await Company.create({ name: DataBuilder.randomString(256), code: DataBuilder.randomString(17), idApiKey: testApiKey.idApiKey });
		}).rejects.toThrow();
        
	});

	test('isCompanyValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Company.create({});
		}).rejects.toThrow();
        
	});

	test('isCompanyValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await Company.create({ name: '', code: '', idApiKey: testApiKey.idApiKey });
		}).rejects.toThrow();
        
	});

	test('isCompanyIdApiKeyValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: DataBuilder.randomString(2) });
		}).rejects.toThrow();
        
	});

	test('isCompanyValidationsUnique_BeingNotUnique_ThrowingException', async () => {

		expect(async () => {

			const company = await Company.findByPk(1);
			await Company.create({ name: DataBuilder.randomString(), code: company.code, idApiKey: 1 });

		}).rejects.toThrow();
        
	});

	test('isCompanyIdApiKeyForeignKey_PerformingLazyAssociation_True', async () => {

		const company = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });

		const apiKey = await company.getApiKey();

		expect(apiKey).not.toBeNull();

		expect(apiKey).toEqual(expect.objectContaining({
			idApiKey: expect.any(Number),
			key: expect.any(String),
		}));

		await company.destroy();
        
	});

	test('isCompanyIdApiKeyForeignKey_PerformingEagerAssociation_True', async () => {

		const company = await Company.create({ name: DataBuilder.randomString(), code: DataBuilder.randomString(16), idApiKey: testApiKey.idApiKey });

		const apiKey = (await Company.findByPk(company.idCompany, { include: ['apiKey'] })).apiKey;

		expect(apiKey).not.toBeNull();

		expect(apiKey).toEqual(expect.objectContaining({
			idApiKey: expect.any(Number),
			key: expect.any(String)
		}));

		await company.destroy();
        
	});

});
