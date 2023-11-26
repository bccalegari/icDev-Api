const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../utils/DataBuilder');

const State = require('../../models').state;

describe('State Model Tests', () => {

	test('isState_BeingSelected_True', async () => {

		const state = await State.findByPk(1);

		expect(state).not.toBeNull();

		expect(state).toEqual(expect.objectContaining({
			idState: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			idCountry: expect.any(Number)
		}));

	});

	test('isState_BeingSaved_True', async () => {

		const state = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });
		expect(state).not.toBeNull();
		await state.destroy();

	});

	test('isState_SequenceUp_True', async () => {

		const states = await State.findAll();
		const lastState = states.pop();

		const state = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });
		expect(state.idState).toBeGreaterThan(lastState.idState);

		await state.destroy();

	});

	test('isState_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(50);

		const stateBeforeUpdate = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });
		const stateAfterUpdate = await stateBeforeUpdate.update({ name: newName });

		expect(stateAfterUpdate.name).toBe(newName);
		await stateAfterUpdate.destroy();

	});

	test('isState_BeingDeleted_True', async () => {

		const stateBeforeDelete = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });
		await stateBeforeDelete.destroy();

		const stateAfterDelete = await State.findByPk(stateBeforeDelete.idState);
		expect(stateAfterDelete).toBe(null);

	});

	test('isStateValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await await State.create({ name: DataBuilder.randomString(51), isoAlpha2: DataBuilder.randomString(3), idCountry: 1 });
		}).rejects.toThrow();
        
	});

	test('isStateValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await State.create({});
		}).rejects.toThrow();
        
	});

	test('isStateValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await State.create({ name: '', isoAlpha2: '', idCountry: 1 });
		}).rejects.toThrow();
        
	});

	test('isStateIdCountryValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: DataBuilder.randomString(2) });
		}).rejects.toThrow();
        
	});

	test('isStateIdCountryForeignKey_PerformingLazyAssociation_True', async () => {

		const state = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });

		const country = await state.getCountry();

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await state.destroy();
        
	});

	test('isStateIdCountryForeignKey_PerformingEagerAssociation_True', async () => {

		const state = await State.create({ name: DataBuilder.randomString(50), isoAlpha2: DataBuilder.randomString(2), idCountry: 1 });

		const country = (await State.findByPk(state.idState, { include: ['country'] })).country;

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await state.destroy();
        
	});

});
