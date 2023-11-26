const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const UserRoles = require('../../../models').userRoles;
const User = require('../../../models').user;
const Role = require('../../../models').role;

describe('UserRoles Model Unit Tests', () => {

	let testUser;
	let testRole;

	beforeAll(async () => {
		testUser = await User.create({
			name: DataBuilder.randomString(50),
			lastName: DataBuilder.randomString(50),
			cpf: DataBuilder.randomString(11),
			street: DataBuilder.randomString(150),
			streetNumber: DataBuilder.randomInteger(),
			district: DataBuilder.randomString(150),
			birthDate: DataBuilder.randomDate(),
			phone: DataBuilder.randomString(14),
			email: DataBuilder.randomEmail(),
			idCity: 1,
			idCompany: 1,
		}, {
			createdBy: 1
		});
		testRole = await Role.create({ name: DataBuilder.randomString(50)});
	});

	afterAll(async () => {
		await testUser.destroy({force: true});
		await testRole.destroy();
	});

	test('isUserRoles_BeingSelected_True', async () => {

		const userRole = await UserRoles.findOne({ where: {
			idUser: 1,
			idRole: 1
		}});

		expect(userRole).not.toBeNull();

		expect(userRole).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			idRole: expect.any(Number)
		}));

	});

	test('isUserRoles_BeingSaved_True', async () => {

		const userRole = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });
		expect(userRole).not.toBeNull();
		await userRole.destroy();

	});

	test('isUserRoles_BeingUpdated_True', async () => {

		await UserRoles.create({ idUser: testUser.idUser, idRole: 1 });

		await UserRoles.update({ idRole: testRole.idRole }, { where: {
			idUser: testUser.idUser,
			idRole: 1
		}});

		const userRoleAfterUpdate = await UserRoles.findOne({ where: {
			idUser: testUser.idUser,
			idRole: testRole.idRole
		}});

		expect(userRoleAfterUpdate.idRole).toBe(testRole.idRole);
		await userRoleAfterUpdate.destroy();

	});

	test('isUserRoles_BeingDeleted_True', async () => {

		const userRoleBeforeDelete = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });
		await userRoleBeforeDelete.destroy();

		const userRoleAfterDelete = await UserRoles.findOne({ where: {
			idUser: testUser.idUser,
			idRole: testRole.idRole
		}});

		expect(userRoleAfterDelete).toBe(null);

	});

	test('isUserRolesValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await UserRoles.create({});
		}).rejects.toThrow();
        
	});

	test('isUserRolesValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await UserRoles.create({ idUser: DataBuilder.randomString(2), idRole: DataBuilder.randomString(2) });
		}).rejects.toThrow();
        
	});

	test('isUserRolesIdUserForeignKey_PerformingLazyAssociation_True', async () => {

		const userRole = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });

		const user = await userRole.getUser();

		expect(user).not.toBeNull();

		expect(user).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			cpf: expect.any(String),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
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

		await userRole.destroy();
        
	});

	test('isUserRolesIdUserForeignKey_PerformingEagerAssociation_True', async () => {

		const userRole = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });

		const user = (await UserRoles.findOne({ where: {
			idUser: testUser.idUser,
			idRole: testRole.idRole
		}, include: ['user']})).user;

		expect(user).not.toBeNull();

		expect(user).toEqual(expect.objectContaining({
			idUser: expect.any(Number),
			name: expect.any(String),
			lastName: expect.any(String),
			login: expect.toBeOneOf([expect.any(String), null]),
			password: expect.toBeOneOf([expect.any(String), null]),
			cpf: expect.any(String),
			street: expect.any(String),
			streetNumber: expect.any(Number),
			district: expect.any(String),
			complement: expect.toBeOneOf([expect.any(String), null]),
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

		await userRole.destroy();
        
	});

	test('isUserRolesIdRoleForeignKey_PerformingLazyAssociation_True', async () => {

		const userRole = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });

		const role = await userRole.getRole();

		expect(role).not.toBeNull();

		expect(role).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await userRole.destroy();
        
	});

	test('isUserRolesIdRoleForeignKey_PerformingEagerAssociation_True', async () => {

		const userRole = await UserRoles.create({ idUser: testUser.idUser, idRole: testRole.idRole });

		const role = (await UserRoles.findOne({ where: {
			idUser: testUser.idUser,
			idRole: testRole.idRole
		}, include: ['role']})).role;

		expect(role).not.toBeNull();

		expect(role).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await userRole.destroy();
        
	});

});
