const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const Unit = require('../../../src/models').unit;

describe('Unit Model Unit Tests', () => {

	test('isUnit_BeingSelected_True', async () => {

		const unit = await Unit.findByPk(1);

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

	});

	test('isUnit_BeingSaved_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(50),
			companyName: DataBuilder.randomString(50),
			phone: DataBuilder.randomString(15),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(16),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(unit).not.toBeNull();

		await unit.destroy({
			force: true
		});

	});

	test('isUnit_SequenceUp_True', async () => {

		const units = await Unit.findAll();
		const lastUnit = units.pop();

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(50),
			companyName: DataBuilder.randomString(50),
			phone: DataBuilder.randomString(15),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(16),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.destroy({
			force: true
		});

		expect(unit.idUnit).toBeGreaterThan(lastUnit.idUnit);
        
	});

	test('isUnit_BeingUpdated_True', async () => {

		const newTradingName = DataBuilder.randomString(45);

		const unitBeforeUpdate = await Unit.create({
			tradingName: DataBuilder.randomString(50),
			companyName: DataBuilder.randomString(50),
			phone: DataBuilder.randomString(15),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(16),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});
        
		const unitAfterUpdate = await unitBeforeUpdate.update({ tradingName: newTradingName }, {
			updatedBy: 1
		});

		await unitAfterUpdate.destroy({
			force: true
		});

		expect(unitAfterUpdate.name).toBe(newTradingName);

	});

	test('isUnit_BeingDeleted_True', async () => {

		const unitBeforeDelete = await Unit.create({
			tradingName: DataBuilder.randomString(50),
			companyName: DataBuilder.randomString(50),
			phone: DataBuilder.randomString(15),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(16),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unitBeforeDelete.destroy({
			force: true
		});

		const unitAfterDelete = await Unit.findByPk(unitBeforeDelete.idUnit);
		expect(unitAfterDelete).toBe(null);

	});

	//sss

	test('isUnitValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(51),
				companyName: DataBuilder.randomString(51),
				phone: DataBuilder.randomString(16),
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				zipCode: DataBuilder.randomString(17),
				email: DataBuilder.randomEmail(),
				idUnitType: 1,
				idCity: 1
			}, {
				createdBy: 1
			});	
		}).rejects.toThrow();
        
	});

	test('isUnitValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({});
		}).rejects.toThrow();
        
	});

	test('isUnitValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: '',
				companyName: '',
				phone: '',
				street: '',
				streetNumber: DataBuilder.randomInteger(),
				district: '',
				zipCode: '',
				email: '',
				idUnitType: 1,
				idCity: 1
			}, {
				createdBy: 1
			});	
		}).rejects.toThrow();
        
	});

	test('isUnitValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(50),
				companyName: DataBuilder.randomString(50),
				phone: DataBuilder.randomString(15),
				street: DataBuilder.randomString(150),
				streetNumber: DataBuilder.randomString(2),
				district: DataBuilder.randomString(150),
				zipCode: DataBuilder.randomString(16),
				email: DataBuilder.randomEmail(),
				idUnitType: DataBuilder.randomString(2),
				idCity: DataBuilder.randomString(2)
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();
        
	});

	test('isUnitEmailValidationIsEmail_BeingNotEmail_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(50),
				companyName: DataBuilder.randomString(50),
				phone: DataBuilder.randomString(15),
				street: DataBuilder.randomString(150),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(150),
				zipCode: DataBuilder.randomString(16),
				email: DataBuilder.randomString(),
				idUnitType: 1,
				idCity: 1
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();

	});

	test('isUnitBeforeCreateHook_BeingUsed_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(unit.createdBy).not.toBeNull();

		expect(unit.createdAt).not.toBeNull();

		expect(typeof(unit.createdBy)).toEqual('number');

		expect(unit.createdAt).toEqual(expect.any(Date));

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeCreateHookCreatedByValidationNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(51),
				companyName: DataBuilder.randomString(51),
				phone: DataBuilder.randomString(16),
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				zipCode: DataBuilder.randomString(17),
				email: DataBuilder.randomEmail(),
				idUnitType: 1,
				idCity: 1
			});
		}).rejects.toThrow();

	});

	test('isUnitBeforeCreateHookCreatedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(51),
				companyName: DataBuilder.randomString(51),
				phone: DataBuilder.randomString(16),
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				zipCode: DataBuilder.randomString(17),
				email: DataBuilder.randomEmail(),
				idUnitType: 1,
				idCity: 1
			}, {
				createdBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

	});

	test('isUnitBeforeCreateHookCreatedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

		expect(async () => {
			await Unit.create({
				tradingName: DataBuilder.randomString(51),
				companyName: DataBuilder.randomString(51),
				phone: DataBuilder.randomString(16),
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				zipCode: DataBuilder.randomString(17),
				email: DataBuilder.randomEmail(),
				idUnitType: 1,
				idCity: 1
			}, {
				createdBy: 1,
				createdAt: new Date()
			});
		}).rejects.toThrow();

	});

	test('isUnitBeforeUpdateHook_BeingUsed_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.update({ tradingName: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		expect(unit.updatedBy).not.toBeNull();

		expect(unit.updatedAt).not.toBeNull();

		expect(typeof(unit.updatedBy)).toEqual('number');

		expect(unit.updatedAt).toEqual(expect.any(Date));

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeUpdateHookUpdatedByValidationNotNull_BeingNull_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.update({ tradingName: DataBuilder.randomString(50) });
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeUpdateHookUpdatedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.update({ tradingName: DataBuilder.randomString(50) }, {
				updatedBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeUpdateHookUpdatedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.update({ tradingName: DataBuilder.randomString(50) }, {
				updatedBy: DataBuilder.randomString(2),
				updatedAt: new Date()
			});
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeDeleteHook_BeingUsed_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.destroy({ deletedBy: 1 });

		expect(unit.deletedBy).not.toBeNull();

		expect(unit.deletedAt).not.toBeNull();

		expect(typeof(unit.deletedBy)).toEqual('number');

		expect(unit.deletedAt).toEqual(expect.any(Date));

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeDeleteHookDeletedByValidationNotNull_BeingNull_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.destroy();
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeDeleteHookDeletedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.destroy({
				deletedBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitBeforeDeleteHookDeletedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		expect(async () => {
			await unit.destroy({
				deletedBy: 1,
				deletedAt: new Date()
			});
		}).rejects.toThrow();

		await unit.destroy({
			force: true
		});

	});

	test('isUnitIdCityForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const city = await unit.getCity();

		expect(city).not.toBeNull();

		expect(city).toEqual(expect.objectContaining({
			idCity: expect.any(Number),
			name: expect.any(String),
			stateAcronym: expect.any(String),
			idState: expect.any(Number)
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitIdCityForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const city = (await Unit.findByPk(unit.idUnit, { include: ['city'] })).city;

		expect(city).not.toBeNull();

		expect(city).toEqual(expect.objectContaining({
			idCity: expect.any(Number),
			name: expect.any(String),
			stateAcronym: expect.any(String),
			idState: expect.any(Number)
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitIdUnitTypeForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const unitType = await unit.getUnitType();

		expect(unitType).not.toBeNull();

		expect(unitType).toEqual(expect.objectContaining({
			idUnitType: expect.any(Number),
			name: expect.any(String)
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitIdUnitTypeForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const unitType = (await Unit.findByPk(unit.idUnit, { include: ['unitType'] })).unitType;

		expect(unitType).not.toBeNull();

		expect(unitType).toEqual(expect.objectContaining({
			idUnitType: expect.any(Number),
			name: expect.any(String)
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitCreatedByForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const createdBy = await unit.getUserCreatedBy();

		expect(createdBy).not.toBeNull();

		expect(createdBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitCreatedByForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const createdBy = (await Unit.findByPk(unit.idUnit, { include: ['userCreatedBy'] })).userCreatedBy;

		expect(createdBy).not.toBeNull();

		expect(createdBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitUpdatedByForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.update({ name: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		const updatedBy = await unit.getUserUpdatedBy();

		expect(updatedBy).not.toBeNull();

		expect(updatedBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitUpdatedByForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.update({ name: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		const updatedBy = (await Unit.findByPk(unit.idUnit, { include: ['userUpdatedBy'] })).userUpdatedBy;

		expect(updatedBy).not.toBeNull();

		expect(updatedBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitDeletedByForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.destroy({ deletedBy: 1 });

		const deletedBy = await unit.getUserDeletedBy();

		expect(deletedBy).not.toBeNull();

		expect(deletedBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitDeletedByForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		await unit.destroy({ deletedBy: 1 });

		const deletedBy = (await Unit.findByPk(unit.idUnit, { include: ['userDeletedBy'],  paranoid: false })).userDeletedBy;

		expect(deletedBy).not.toBeNull();

		expect(deletedBy).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
			zipCode: expect.any(String),
			birthDate: expect.any(String),
			phone: expect.any(String),
			email: expect.any(String),
			idCity: expect.any(Number),
			createdBy: expect.any(Number),
			createdAt: expect.any(Date),
			updatedBy: expect.toBeOneOf([expect.any(Number), null]),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedBy: expect.toBeOneOf([expect.any(Number), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
			idCompany: expect.any(Number),
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitIdCompanyForeignKey_PerformingLazyAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const company = await unit.getCompany();

		expect(company).not.toBeNull();

		expect(company).toEqual(expect.objectContaining({
			idCompany: expect.any(Number),
			name: expect.any(String),
			code: expect.any(String),
			idApiKey: expect.any(Number)
		}));

		await unit.destroy({
			force: true
		});
        
	});

	test('isUnitIdCompanyForeignKey_PerformingEagerAssociation_True', async () => {

		const unit = await Unit.create({
			tradingName: DataBuilder.randomString(51),
			companyName: DataBuilder.randomString(51),
			phone: DataBuilder.randomString(16),
			street: DataBuilder.randomString(151),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(151),
			zipCode: DataBuilder.randomString(17),
			email: DataBuilder.randomEmail(),
			idUnitType: 1,
			idCity: 1
		}, {
			createdBy: 1
		});

		const company = (await Unit.findByPk(unit.idUnit, { include: ['company'] })).company;

		expect(company).not.toBeNull();

		expect(company).toEqual(expect.objectContaining({
			idCompany: expect.any(Number),
			name: expect.any(String),
			code: expect.any(String),
			idApiKey: expect.any(Number)
		}));

		await unit.destroy({
			force: true
		});
        
	});

});
