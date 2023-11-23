const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../utils/DataBuilder');

const User = require('../../models').user;

describe('User Model Tests', () => {

	test('isUser_BeingSelected_True', async () => {

		const user = await User.findByPk(1);

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

	});

	test('isUser_SequenceUp_True', async () => {

		const users = await User.findAll();
		const lastUser = users.pop();

		const user = await User.create({
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

		await user.destroy({
			force: true,
			deletedBy: 1
		});

		expect(user.idUser).toBeGreaterThan(lastUser.idUser);
        
	});

	test('isUser_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(45);

		const userBeforeUpdate = await User.create({
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
        
		const userAfterUpdate = await userBeforeUpdate.update({ name: newName }, {
			updatedBy: 1
		});

		await userAfterUpdate.destroy({
			force: true,
			deletedBy: 1
		});

		expect(userAfterUpdate.name).toBe(newName);

	});

	test('isUser_BeingDeleted_True', async () => {

		const userBeforeDelete = await User.create({
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

		await userBeforeDelete.destroy({
			force: true,
			deletedBy: 1
		});

		const userAfterDelete = await User.findByPk(userBeforeDelete.idUser);
		expect(userAfterDelete).toBe(null);

	});

	test('isUserConstraintsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

		expect(async () => {
			await User.create({
				name: DataBuilder.randomString(51),
				lastName: DataBuilder.randomString(51),
				login: DataBuilder.randomString(31),
				password: DataBuilder.randomString(81),
				cpf: DataBuilder.randomString(12),
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				complement: DataBuilder.randomString(256),
				birthDate: DataBuilder.randomDate(),
				phone: DataBuilder.randomString(15),
				email: DataBuilder.randomEmail(256),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();
        
	});

	test('isUserConstraintsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await User.create({});
		}).rejects.toThrow();
        
	});

	test('isUserConstraintsNotEmpty_BeingEmpty_ThrowingException', async () => {

		expect(async () => {
			await User.create({
				name: '',
				lastName: '',
				cpf: '',
				street: '',
				streetNumber: DataBuilder.randomInteger(),
				district: '',
				birthDate: DataBuilder.randomDate(),
				phone: '',
				email: '',
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();
        
	});

	test('isUserConstraintsIsInteger_BeingNotInteger_ThrowingException', async () => {

		expect(async () => {
			await User.create({
				name: '',
				lastName: '',
				cpf: '',
				street: '',
				streetNumber: DataBuilder.randomString(2),
				district: '',
				birthDate: DataBuilder.randomDate(),
				phone: '',
				email: '',
				idCity: DataBuilder.randomString(2),
				idCompany: DataBuilder.randomString(2),
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();
        
	});

	test('isUserConstraintsUnique_BeingNotUnique_ThrowingException', async () => {

		expect(async () => {

			const user = await User.findByPk(1);
            
			await User.create({
				name: DataBuilder.randomString(51),
				lastName: DataBuilder.randomString(51),
				login: user.login,
				password: DataBuilder.randomString(81),
				cpf: user.cpf,
				street: DataBuilder.randomString(151),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(151),
				complement: DataBuilder.randomString(256),
				birthDate: DataBuilder.randomDate(),
				phone: user.phone,
				email: user.email,
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});

		}).rejects.toThrow();
        
	});

	test('isUserBirthDateConstraintIsDate_BeingNotDate_ThrowingException', async () => {

		expect(async () => {
			await User.create({
				name: DataBuilder.randomString(50),
				lastName: DataBuilder.randomString(50),
				cpf: DataBuilder.randomString(11),
				street: DataBuilder.randomString(150),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(150),
				birthDate: DataBuilder.randomString(),
				phone: DataBuilder.randomString(14),
				email: DataBuilder.randomEmail(),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();

	});

	test('isUserBirthDateConstraintIsBeforeToday_BeingNotBeforeToday_ThrowingException', async () => {

		let futureDate = new Date();
		futureDate = futureDate.setDate(futureDate.getDate() + 1);

		expect(async () => {
			await User.create({
				name: DataBuilder.randomString(50),
				lastName: DataBuilder.randomString(50),
				cpf: DataBuilder.randomString(11),
				street: DataBuilder.randomString(150),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(150),
				birthDate: futureDate,
				phone: DataBuilder.randomString(14),
				email: DataBuilder.randomEmail(),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();

	});

	test('isUserEmailConstraintIsEmail_BeingNotEmail_ThrowingException', async () => {

		expect(async () => {
			await User.create({
				name: DataBuilder.randomString(50),
				lastName: DataBuilder.randomString(50),
				cpf: DataBuilder.randomString(11),
				street: DataBuilder.randomString(150),
				streetNumber: DataBuilder.randomInteger(),
				district: DataBuilder.randomString(150),
				birthDate: DataBuilder.randomDate(),
				phone: DataBuilder.randomString(14),
				email: DataBuilder.randomString(),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1
			});
		}).rejects.toThrow();

	});

});
