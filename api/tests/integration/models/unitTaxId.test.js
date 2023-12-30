const { describe, test, expect, afterAll, beforeAll } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const UnitTaxId = require('../../../src/models').unitTaxId;
const Unit = require('../../../src/models').unit;

describe('UnitTaxId Model Unit Tests', () => {

	let testUnit;

	beforeAll(async () => {
		testUnit = await Unit.create({
			tradingName: DataBuilder.randomString(50),
			companyName: DataBuilder.randomString(50),
			phone: DataBuilder.randomString(15),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(15),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});
	});

	afterAll(async () => {
		await testUnit.destroy({force: true});
	});

	test('isUnitTaxId_BeingSelected_True', async () => {

		const unitTaxId = await UnitTaxId.findByPk(1);

		expect(unitTaxId).not.toBeNull();

		expect(unitTaxId).toEqual(expect.objectContaining({
			idUnitTaxId: expect.any(Number),
			taxId: expect.any(String),
			idUnit: expect.any(Number),
			idCountry: expect.any(Number),
		}));

	});

	test('isUnitTaxId_BeingSaved_True', async () => {

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });
		expect(unitTaxId).not.toBeNull();
		await unitTaxId.destroy();

	});

	test('isUnitTaxId_SequenceUp_True', async () => {

		const unitTaxIds = await UnitTaxId.findAll();
		const lastUnitTaxId = unitTaxIds.pop();

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });
		expect(unitTaxId.idUnitTaxId).toBeGreaterThan(lastUnitTaxId.idUnitTaxId);

		await unitTaxId.destroy();
		
	});

	test('isUnitTaxId_BeingUpdated_True', async () => {

		const newUnitTaxId = DataBuilder.randomString() ;

		const unitTaxIdBeforeUpdate = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });
		const unitTaxIdAfterUpdate = await unitTaxIdBeforeUpdate.update({ taxId: newUnitTaxId });

		expect(unitTaxIdAfterUpdate.taxId).toBe(newUnitTaxId);
		await unitTaxIdAfterUpdate.destroy();
	});

	test('isUnitTaxId_BeingDeleted_True', async () => {

		const unitTaxIdBeforeDelete = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });
		await unitTaxIdBeforeDelete.destroy();

		const unitTaxIdAfterDelete = await UnitTaxId.findByPk(unitTaxIdBeforeDelete.idUnitTaxId);
		expect(unitTaxIdAfterDelete).toBe(null);

	});

	test('isUnitTaxIdTaxIdValidationMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await UnitTaxId.create({ taxId: DataBuilder.randomString(256), idUnit: testUnit.idUnit, idCountry: 1 });
		}).rejects.toThrow();
        
	});

	test('isUnitTaxIdValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await UnitTaxId.create({});
		}).rejects.toThrow();
        
	});

	test('isUnitTaxIdTaxIdValidationNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await UnitTaxId.create({ taxId: '', idUnit: null, idCountry: null });
		}).rejects.toThrow();
        
	});

	test('isUnitTaxIdValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: DataBuilder.randomString(), idCountry: DataBuilder.randomString() });
		}).rejects.toThrow();

	});

	test('isUnitTaxIdIdUnitForeignKey_PerformingLazyAssociation_True', async () => {

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });

		const unit = await unitTaxId.getUnit();

		expect(unit).not.toBeNull();

		expect(unit).toEqual(expect.objectContaining({
			idUnit: expect.any(Number),
			tradingName: expect.any(String),
			companyName: expect.any(String),
			phone: expect.any(String),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			idUnitType: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.toBeOneOf([expect.any(Number), null]),
		}));

		await unitTaxId.destroy();
        
	});

	test('isUnitTaxIdIdUnitForeignKey_PerformingEagerAssociation_True', async () => {

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });

		const unit = (await UnitTaxId.findByPk(unitTaxId.idUnitTaxId, { include: ['unit'] })).unit;

		expect(unit).not.toBeNull();

		expect(unit).toEqual(expect.objectContaining({
			idUnit: expect.any(Number),
			tradingName: expect.any(String),
			companyName: expect.any(String),
			phone: expect.any(String),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			idUnitType: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.toBeOneOf([expect.any(Number), null]),
		}));

		await unitTaxId.destroy();
        
	});

	test('isUnitTaxIdCountryForeignKey_PerformingLazyAssociation_True', async () => {

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });

		const country = await unitTaxId.getCountry();

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await unitTaxId.destroy();
        
	});

	test('isUnitTaxIdCountryForeignKey_PerformingEagerAssociation_True', async () => {

		const unitTaxId = await UnitTaxId.create({ taxId: DataBuilder.randomString(), idUnit: testUnit.idUnit, idCountry: 1 });

		const country = (await UnitTaxId.findByPk(unitTaxId.idUnitTaxId, { include: ['country'] })).country;

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await unitTaxId.destroy();
        
	});

	test('isUnitTaxValidationsUnique_BeingNotUnique_ThrowingException', async () => {

		expect(async () => {

			const unitTaxId = await UnitTaxId.findByPk(1);
			await UnitTaxId.create({ taxId: unitTaxId.taxId, idUnit: unitTaxId.idUnit, idCountry: unitTaxId.idCountry });

		}).rejects.toThrow();
        
	});

});
