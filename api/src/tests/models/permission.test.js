const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../utils/DataBuilder');

const Permission = require('../../models').permission;

describe('Permission Model Tests', () => {

	test('isPermission_BeingSelected_True', async () => {

		const permission = await Permission.findByPk(1);

		expect(permission).not.toBeNull();

		expect(permission).toEqual(expect.objectContaining({
			idPermission: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

	});

	test('isPermission_BeingSaved_True', async () => {

		const permission = await Permission.create({ name: DataBuilder.randomString(50) });
		expect(permission).not.toBeNull();
		await permission.destroy();

	});

	test('isPermission_SequenceUp_True', async () => {

		const permissions = await Permission.findAll();
		const lastPermission = permissions.pop();

		const permission = await Permission.create({ name: DataBuilder.randomString(50) });
		expect(permission.idPermission).toBeGreaterThan(lastPermission.idPermission);

		await permission.destroy();
		
	});

	test('isPermission_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(50);

		const permissionBeforeUpdate = await Permission.create({ name: DataBuilder.randomString(50) });
		const permissionAfterUpdate = await permissionBeforeUpdate.update({ name: newName });

		expect(permissionAfterUpdate.name).toBe(newName);
		await permissionAfterUpdate.destroy();

	});

	test('isPermission_BeingDeleted_True', async () => {

		const permissionBeforeDelete = await Permission.create({ name: DataBuilder.randomString(50) });
		await permissionBeforeDelete.destroy();

		const permissionAfterDelete = await Permission.findByPk(permissionBeforeDelete.idPermission);
		expect(permissionAfterDelete).toBe(null);

	});

	test('isPermissionValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await Permission.create({ name: DataBuilder.randomString(51), description: DataBuilder.randomString(256) });
		}).rejects.toThrow();
        
	});

	test('isPermissionValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Permission.create({});
		}).rejects.toThrow();
        
	});

	test('isPermissionValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await Permission.create({ name: '' });
		}).rejects.toThrow();
        
	});

});
