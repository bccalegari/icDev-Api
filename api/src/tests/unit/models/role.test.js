const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const Role = require('../../../models').role;

describe('Role Model Unit Tests', () => {

	test('isRole_BeingSelected_True', async () => {

		const role = await Role.findByPk(1);

		expect(role).not.toBeNull();

		expect(role).toEqual(expect.objectContaining({
			idRole: expect.any(Number),
			name: expect.any(String),
			description: expect.toBeOneOf([expect.any(String), null])
		}));

	});

	test('isRole_BeingSaved_True', async () => {

		const role = await Role.create({ name: DataBuilder.randomString(50) });
		expect(role).not.toBeNull();
		await role.destroy();

	});

	test('isRole_SequenceUp_True', async () => {

		const roles = await Role.findAll();
		const lastRole = roles.pop();

		const role = await Role.create({ name: DataBuilder.randomString(50) });
		expect(role.idRole).toBeGreaterThan(lastRole.idRole);

		await role.destroy();
		
	});

	test('isRole_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(50);

		const roleBeforeUpdate = await Role.create({ name: DataBuilder.randomString(50) });
		const roleAfterUpdate = await roleBeforeUpdate.update({ name: newName });

		expect(roleAfterUpdate.name).toBe(newName);
		await roleAfterUpdate.destroy();

	});

	test('isRole_BeingDeleted_True', async () => {

		const roleBeforeDelete = await Role.create({ name: DataBuilder.randomString(50) });
		await roleBeforeDelete.destroy();

		const roleAfterDelete = await Role.findByPk(roleBeforeDelete.idRole);
		expect(roleAfterDelete).toBe(null);

	});

	test('isRoleValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await Role.create({ name: DataBuilder.randomString(51), description: DataBuilder.randomString(256) });
		}).rejects.toThrow();
        
	});

	test('isRoleValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await Role.create({});
		}).rejects.toThrow();
        
	});

	test('isRoleValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await Role.create({ name: '' });
		}).rejects.toThrow();
        
	});

});
