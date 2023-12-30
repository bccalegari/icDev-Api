const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const UnitType = require('../../../src/models').unitType;

describe('UnitType Model Unit Tests', () => {

	test('isUnitType_BeingSelected_True', async () => {

		const unitType = await UnitType.findByPk(1);

		expect(unitType).not.toBeNull();

		expect(unitType).toEqual(expect.objectContaining({
			idUnitType: expect.any(Number),
			name: expect.any(String),
		}));

	});

	test('isUnitType_BeingSaved_True', async () => {

		const unitType = await UnitType.create({ name: DataBuilder.randomString(50) });
		expect(unitType).not.toBeNull();
		await unitType.destroy();

	});

	test('isUnitType_SequenceUp_True', async () => {

		const countries = await UnitType.findAll();
		const lastUnitType = countries.pop();

		const unitType = await UnitType.create({ name: DataBuilder.randomString(50) });
		expect(unitType.idUnitType).toBeGreaterThan(lastUnitType.idUnitType);

		await unitType.destroy();
		
	});

	test('isUnitType_BeingUpdated_True', async () => {

		const newUnitType = DataBuilder.randomString(16) ;

		const unitTypeBeforeUpdate = await UnitType.create({ name: DataBuilder.randomString(50) });
		const unitTypeAfterUpdate = await unitTypeBeforeUpdate.update({ name: newUnitType });

		expect(unitTypeAfterUpdate.name).toBe(newUnitType);
		await unitTypeAfterUpdate.destroy();
	});

	test('isUnitType_BeingDeleted_True', async () => {

		const unitTypeBeforeDelete = await UnitType.create({ name: DataBuilder.randomString(50) });
		await unitTypeBeforeDelete.destroy();

		const unitTypeAfterDelete = await UnitType.findByPk(unitTypeBeforeDelete.idUnitType);
		expect(unitTypeAfterDelete).toBe(null);

	});

	test('isUnitTypeNameValidationMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await UnitType.create({ name: DataBuilder.randomString(51) });
		}).rejects.toThrow();
        
	});

	test('isUnitTypeNameValidationNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await UnitType.create({});
		}).rejects.toThrow();
        
	});

	test('isUnitTypeNameValidationNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await UnitType.create({ name: '' });
		}).rejects.toThrow();
        
	});

});
