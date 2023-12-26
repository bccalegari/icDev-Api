const { describe, test, expect, afterAll, beforeAll } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const UserTaxId = require('../../../src/models').userTaxId;
const User = require('../../../src/models').user;

describe('UserTaxId Model Unit Tests', () => {

	let testUser;

	beforeAll(async () => {
		testUser = await User.create({
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			zipCode: DataBuilder.randomString(16),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
			idCity: 1,
			idCompany: 1,
		}, {
			createdBy: 1
		});
	});

	afterAll(async () => {
		await testUser.destroy({force: true});
	});

	test('isUserTaxId_BeingSelected_True', async () => {

		const userTaxId = await UserTaxId.findByPk(1);

		expect(userTaxId).not.toBeNull();

		expect(userTaxId).toEqual(expect.objectContaining({
			idUserTaxId: expect.any(Number),
			taxId: expect.any(String),
			idUser: expect.any(Number),
			idCountry: expect.any(Number),
		}));

	});

	test('isUserTaxId_BeingSaved_True', async () => {

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });
		expect(userTaxId).not.toBeNull();
		await userTaxId.destroy();

	});

	test('isUserTaxId_SequenceUp_True', async () => {

		const userTaxIds = await UserTaxId.findAll();
		const lastUserTaxId = userTaxIds.pop();

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });
		expect(userTaxId.idUserTaxId).toBeGreaterThan(lastUserTaxId.idUserTaxId);

		await userTaxId.destroy();
		
	});

	test('isUserTaxId_BeingUpdated_True', async () => {

		const newUserTaxId = DataBuilder.randomString() ;

		const userTaxIdBeforeUpdate = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });
		const userTaxIdAfterUpdate = await userTaxIdBeforeUpdate.update({ taxId: newUserTaxId });

		expect(userTaxIdAfterUpdate.taxId).toBe(newUserTaxId);
		await userTaxIdAfterUpdate.destroy();
	});

	test('isUserTaxId_BeingDeleted_True', async () => {

		const userTaxIdBeforeDelete = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });
		await userTaxIdBeforeDelete.destroy();

		const userTaxIdAfterDelete = await UserTaxId.findByPk(userTaxIdBeforeDelete.idUserTaxId);
		expect(userTaxIdAfterDelete).toBe(null);

	});

	test('isUserTaxIdTaxIdValidationMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await UserTaxId.create({ taxId: DataBuilder.randomString(256), idUser: testUser.idUser, idCountry: 1 });
		}).rejects.toThrow();
        
	});

	test('isUserTaxIdValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await UserTaxId.create({});
		}).rejects.toThrow();
        
	});

	test('isUserTaxIdTaxIdValidationNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await UserTaxId.create({ taxId: '', idUser: null, idCountry: null });
		}).rejects.toThrow();
        
	});

	test('isUserTaxIdValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: DataBuilder.randomString(), idCountry: DataBuilder.randomString() });
		}).rejects.toThrow();
        
	});

	test('isUserTaxIdIdUserForeignKey_PerformingLazyAssociation_True', async () => {

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });

		const user = await userTaxId.getUser();

		expect(user).not.toBeNull();

		expect(user).toEqual(expect.objectContaining({
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
			idCompany: expect.any(Number)
		}));

		await userTaxId.destroy();
        
	});

	test('isUserTaxIdIdUserForeignKey_PerformingEagerAssociation_True', async () => {

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });

		const user = (await UserTaxId.findByPk(userTaxId.idUserTaxId, { include: ['user'] })).user;

		expect(user).not.toBeNull();

		expect(user).toEqual(expect.objectContaining({
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
			idCompany: expect.any(Number)
		}));

		await userTaxId.destroy();
        
	});

	test('isUserTaxIdCountryForeignKey_PerformingLazyAssociation_True', async () => {

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });

		const country = await userTaxId.getCountry();

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await userTaxId.destroy();
        
	});

	test('isUserTaxIdCountryForeignKey_PerformingEagerAssociation_True', async () => {

		const userTaxId = await UserTaxId.create({ taxId: DataBuilder.randomString(), idUser: testUser.idUser, idCountry: 1 });

		const country = (await UserTaxId.findByPk(userTaxId.idUserTaxId, { include: ['country'] })).country;

		expect(country).not.toBeNull();

		expect(country).toEqual(expect.objectContaining({
			idCountry: expect.any(Number),
			name: expect.any(String),
			isoAlpha2: expect.any(String),
			isoAlpha3: expect.any(String),
		}));

		await userTaxId.destroy();
        
	});

	test('isUserTaxValidationsUnique_BeingNotUnique_ThrowingException', async () => {

		expect(async () => {

			const userTaxId = await UserTaxId.findByPk(1);
			await UserTaxId.create({ taxId: userTaxId.taxId, idUser: userTaxId.idUser, idCountry: userTaxId.idCountry });

		}).rejects.toThrow();
        
	});

});
