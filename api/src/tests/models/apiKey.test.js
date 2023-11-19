const { describe, test, expect } = require('@jest/globals');
const crypto = require('crypto');

const ApiKey = require('../../models/').apiKey;

describe('ApiKey Model Tests', () => {

	test('isApiKey_BeingSelected_True', async () => {

		const apiKey = await ApiKey.findByPk(1);

		expect(apiKey).not.toBeNull();

		expect(apiKey).toEqual(expect.objectContaining({
			idApiKey: expect.any(Number),
			key: expect.any(String),
		}));

	});

	test('isApiKey_BeingSaved_True', async () => {

		const apiKey = await ApiKey.create({key: crypto.randomBytes(8).toString('hex')});
		expect(apiKey).not.toBeNull();
		await apiKey.destroy();

	});

	test('isApiKey_SequenceUp_True', async () => {

		const apiKeys = await ApiKey.findAll();
		const lastApiKey = apiKeys.pop();

		const apiKey = await ApiKey.create({key: crypto.randomBytes(8).toString('hex')});
		expect(apiKey.idApiKey).toBeGreaterThan(lastApiKey.idApiKey);

		await apiKey.destroy();
	});

	test('isApiKey_BeingUpdated_True', async () => {

		const newApiKey = crypto.randomBytes(8).toString('hex');

		const apiKeyBeforeUpdate = await ApiKey.create({key: crypto.randomBytes(8).toString('hex')});
		const apiKeyAfterUpdate = await apiKeyBeforeUpdate.update({key: newApiKey});

		expect(apiKeyAfterUpdate.key).toBe(newApiKey);
		await apiKeyAfterUpdate.destroy();
	});

	test('isApiKey_BeingDeleted_True', async () => {

		const apiKeyBeforeDelete = await ApiKey.create({key: crypto.randomBytes(8).toString('hex')});
		await apiKeyBeforeDelete.destroy();

		const apiKeyAfterDelete = await ApiKey.findByPk(apiKeyBeforeDelete.idApiKey);
		expect(apiKeyAfterDelete).toBe(null);

	});

	test('isApiKeyConstraintKeyMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await ApiKey.create({key: crypto.randomBytes(9).toString('hex')});
		}).rejects.toThrow();
        
	});

});
