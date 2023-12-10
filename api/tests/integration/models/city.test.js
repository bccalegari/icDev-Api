const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const City = require('../../../src/models').city;

describe('City Model Unit Tests', () => {

	test('isCity_BeingSelected_True', async () => {

		const city = await City.findByPk(1);

		expect(city).not.toBeNull();

		expect(city).toEqual(expect.objectContaining({
			idCity: expect.any(Number),
			name: expect.any(String),
			stateAcronym: expect.any(String),
			idState: expect.any(Number)
		}));

	});

	test('isCity_BeingSaved_True', async () => {

		const city = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });
		expect(city).not.toBeNull();
		await city.destroy();

	});

	test('isCity_SequenceUp_True', async () => {

		const cities = await City.findAll();
		const lastCity = cities.pop();

		const city = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });
		expect(city.idCity).toBeGreaterThan(lastCity.idCity);

		await city.destroy();
		
	});

	test('isCity_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(50);

		const cityBeforeUpdate = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });
		const cityAfterUpdate = await cityBeforeUpdate.update({ name: newName });

		expect(cityAfterUpdate.name).toBe(newName);
		await cityAfterUpdate.destroy();

	});

	test('isCity_BeingDeleted_True', async () => {

		const cityBeforeDelete = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });
		await cityBeforeDelete.destroy();

		const cityAfterDelete = await City.findByPk(cityBeforeDelete.idCity);
		expect(cityAfterDelete).toBe(null);

	});

	test('isCityValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await City.create({ name: DataBuilder.randomString(51), stateAcronym: DataBuilder.randomString(3), idState: 1 });
		}).rejects.toThrow();
        
	});

	test('isCityValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await City.create({});
		}).rejects.toThrow();
        
	});

	test('isCityValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await City.create({ name: '', stateAcronym: '', idState: 1 });
		}).rejects.toThrow();
        
	});

	test('isCityidStateValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: DataBuilder.randomString(2) });
		}).rejects.toThrow();
        
	});

	test('isCityIdStateForeignKey_PerformingLazyAssociation_True', async () => {

		const city = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });

		const state = await city.getState();

		expect(state).not.toBeNull();

		expect(state).toEqual(expect.objectContaining({
			idState: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			idCountry: expect.any(Number)
		}));

		await city.destroy();
        
	});

	test('isCityIdStateForeignKey_PerformingEagerAssociation_True', async () => {

		const city = await City.create({ name: DataBuilder.randomString(50), stateAcronym: DataBuilder.randomString(2), idState: 1 });

		const state = (await City.findByPk(city.idCity, { include: ['state'] })).state;

		expect(state).not.toBeNull();

		expect(state).toEqual(expect.objectContaining({
			idState: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			idCountry: expect.any(Number)
		}));

		await city.destroy();
        
	});

});
