const { describe, test, expect, afterAll, beforeAll } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const RolePermissions = require('../../../src/models').rolePermissions;
const Role = require('../../../src/models').role;
const Permission = require('../../../src/models').permission;

describe('RolePermissions Model Unit Tests', () => {

	let testRole;
	let testPermission;

	beforeAll(async () => {
		testRole = await Role.create({ name: DataBuilder.randomString(50)});
		testPermission = await Permission.create({ name: DataBuilder.randomString(50)});
	});

	afterAll(async () => {
		await testRole.destroy();
		await testPermission.destroy();
	});

	test('isRolePermissions_BeingSelected_True', async () => {

		const rolePermission = await RolePermissions.findOne({ where: {
			idRole: 1,
			idPermission: 1
		}});

		expect(rolePermission).not.toBeNull();

		expect(rolePermission).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			idPermission: expect.any(Number)
		}));

	});

	test('isRolePermissions_BeingSaved_True', async () => {

		const rolePermission = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });
		expect(rolePermission).not.toBeNull();
		await rolePermission.destroy();

	});

	test('isRolePermissions_BeingUpdated_True', async () => {

		await RolePermissions.create({ idRole: testRole.idRole, idPermission: 1  });

		await RolePermissions.update({ idPermission: testPermission.idPermission }, { where: {
			idRole: testRole.idRole,
			idPermission: 1
		}});

		const rolePermissionAfterUpdate = await RolePermissions.findOne({ where: {
			idRole: testRole.idRole,
			idPermission: testPermission.idPermission
		}});

		expect(rolePermissionAfterUpdate.idPermission).toBe(testPermission.idPermission);
		await rolePermissionAfterUpdate.destroy();

	});

	test('isRolePermissions_BeingDeleted_True', async () => {

		const rolePermissionBeforeDelete = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });
		await rolePermissionBeforeDelete.destroy();

		const rolePermissionAfterDelete = await RolePermissions.findOne({ where: {
			idRole: testRole.idRole,
			idPermission: testPermission.idPermission
		}});

		expect(rolePermissionAfterDelete).toBe(null);

	});

	test('isRolePermissionsValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await RolePermissions.create({});
		}).rejects.toThrow();
        
	});

	test('isRolePermissionsValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await RolePermissions.create({ idRole: DataBuilder.randomString(2), idPermission: DataBuilder.randomString(2) });
		}).rejects.toThrow();
        
	});

	test('isRolePermissionsIdRoleForeignKey_PerformingLazyAssociation_True', async () => {

		const rolePermission = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });

		const role = await rolePermission.getRole();

		expect(role).not.toBeNull();

		expect(role).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await rolePermission.destroy();
        
	});

	test('isRolePermissionsIdRoleForeignKey_PerformingEagerAssociation_True', async () => {

		const rolePermission = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });

		const role = (await RolePermissions.findOne({ where: {
			idRole: testRole.idRole,
			idPermission: testPermission.idPermission
		}, include: ['role']})).role;

		expect(role).not.toBeNull();

		expect(role).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await rolePermission.destroy();
        
	});

	test('isRolePermissionsIdPermissionForeignKey_PerformingLazyAssociation_True', async () => {

		const rolePermission = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });

		const permission = await rolePermission.getPermission();

		expect(permission).not.toBeNull();

		expect(permission).toEqual(expect.objectContaining({
			idPermission: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await rolePermission.destroy();
        
	});

	test('isRolePermissionsIdPermissionForeignKey_PerformingEagerAssociation_True', async () => {

		const rolePermission = await RolePermissions.create({ idRole: testRole.idRole, idPermission: testPermission.idPermission });

		const permission = (await RolePermissions.findOne({ where: {
			idRole: testRole.idRole,
			idPermission: testPermission.idPermission
		}, include: ['permission']})).permission;

		expect(permission).not.toBeNull();

		expect(permission).toEqual(expect.objectContaining({
			idPermission: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

		await rolePermission.destroy();
        
	});

});
