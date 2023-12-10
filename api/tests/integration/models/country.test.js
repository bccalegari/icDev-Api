const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const Country = require('../../../src/models').country;

describe('Country Model Unit Tests', () => {

	test('isCountry_BeingSelected_True', async () => {

		const country = await Country.findByPk(1);

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

	});

	test('isCountry_BeingSaved_True', async () => {

		const country = await Country.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), isoAlpha3: DataBuilder.randomString(3) });
		expect(country).not.toBeNull();
		await country.destroy();

	});

	test('isCountry_SequenceUp_True', async () => {

		const countries = await Country.findAll();
		const lastCountry = countries.pop();

		const country = await Country.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), isoAlpha3: DataBuilder.randomString(3) });
		expect(country.idCountry).toBeGreaterThan(lastCountry.idCountry);

		await country.destroy();
		
	});

	test('isCountry_BeingUpdated_True', async () => {

		const newCountry = DataBuilder.randomString(16) ;

		const countryBeforeUpdate = await Country.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), isoAlpha3: DataBuilder.randomString(3) });
		const countryAfterUpdate = await countryBeforeUpdate.update({ name: newCountry });

		expect(countryAfterUpdate.name).toBe(newCountry);
		await countryAfterUpdate.destroy();
	});

	test('isCountry_BeingDeleted_True', async () => {

		const countryBeforeDelete = await Country.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), isoAlpha3: DataBuilder.randomString(3) });
		await countryBeforeDelete.destroy();

		const countryAfterDelete = await Country.findByPk(countryBeforeDelete.idCountry);
		expect(countryAfterDelete).toBe(null);

	});

	test('isCountryValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await Country.create({ name: DataBuilder.randomString(51), isoAlpha2: DataBuilder.randomString(3), isoAlpha3: DataBuilder.randomString(4) });
		}).rejects.toThrow();
        
	});

	test('isCountryValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Country.create({});
		}).rejects.toThrow();
        
	});

	test('isCountryValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await Country.create({ name: '', isoAlpha2: '', isoAlpha3: '' });
		}).rejects.toThrow();
        
	});

});
