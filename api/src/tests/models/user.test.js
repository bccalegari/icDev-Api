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

	test('isUser_BeingSaved_True', async () => {

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

		expect(user).not.toBeNull();

		await user.destroy({
			force: true
		});

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
			force: true
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
			force: true
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
			force: true
		});

		const userAfterDelete = await User.findByPk(userBeforeDelete.idUser);
		expect(userAfterDelete).toBe(null);

	});

	test('isUserValidationsMaxSize_BeingOverMaxSize_ThrowingException', async () => {

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

	test('isUserValidationsNotNull_BeingNull_ThrowingException', async () => {

		expect(async () => {
			await User.create({});
		}).rejects.toThrow();
        
	});

	test('isUserValidationsNotEmpty_BeingEmpty_ThrowingException', async () => {

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

	test('isUserValidationsIsInteger_BeingNotInteger_ThrowingException', async () => {

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

	test('isUserValidationsUnique_BeingNotUnique_ThrowingException', async () => {

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

	test('isUserBirthDateValidationIsDate_BeingNotDate_ThrowingException', async () => {

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

	test('isUserBirthDateValidationIsBeforeToday_BeingNotBeforeToday_ThrowingException', async () => {

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

	test('isUserEmailValidationIsEmail_BeingNotEmail_ThrowingException', async () => {

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

	test('isUserBeforeCreateHook_BeingUsed_True', async () => {

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

		expect(user.createdBy).not.toBeNull();

		expect(user.createdAt).not.toBeNull();

		expect(typeof(user.createdBy)).toEqual('number');

		expect(user.createdAt).toEqual(expect.any(Date));

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeCreateHookCreatedByValidationNotNull_BeingNull_ThrowingException', async () => {

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
				email: DataBuilder.randomEmail(),
				idCity: 1,
				idCompany: 1,
			});
		}).rejects.toThrow();

	});

	test('isUserBeforeCreateHookCreatedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

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
				email: DataBuilder.randomEmail(),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

	});

	test('isUserBeforeCreateHookCreatedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

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
				email: DataBuilder.randomEmail(),
				idCity: 1,
				idCompany: 1,
			}, {
				createdBy: 1,
				createdAt: new Date()
			});
		}).rejects.toThrow();

	});

	test('isUserBeforeUpdateHook_BeingUsed_True', async () => {

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

		await user.update({ name: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		expect(user.updatedBy).not.toBeNull();

		expect(user.updatedAt).not.toBeNull();

		expect(typeof(user.updatedBy)).toEqual('number');

		expect(user.updatedAt).toEqual(expect.any(Date));

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeUpdateHookUpdatedByValidationNotNull_BeingNull_ThrowingException', async () => {

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

		expect(async () => {
			await user.update({ name: DataBuilder.randomString(50) });
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeUpdateHookUpdatedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

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

		expect(async () => {
			await user.update({ name: DataBuilder.randomString(50) }, {
				updatedBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeUpdateHookUpdatedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

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

		expect(async () => {
			await user.update({ name: DataBuilder.randomString(50) }, {
				updatedBy: DataBuilder.randomString(2),
				updatedAt: new Date()
			});
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeDeleteHook_BeingUsed_True', async () => {

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

		await user.destroy({ deletedBy: 1 });

		expect(user.deletedBy).not.toBeNull();

		expect(user.deletedAt).not.toBeNull();

		expect(typeof(user.deletedBy)).toEqual('number');

		expect(user.deletedAt).toEqual(expect.any(Date));

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeDeleteHookDeletedByValidationNotNull_BeingNull_ThrowingException', async () => {

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

		expect(async () => {
			await user.destroy();
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeDeleteHookDeletedByValidationIsInteger_BeingNotInteger_ThrowingException', async () => {

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

		expect(async () => {
			await user.destroy({
				deletedBy: DataBuilder.randomString(2)
			});
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserBeforeDeleteHookDeletedAtValidationIsNull_BeingNotNull_ThrowingException', async () => {

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

		expect(async () => {
			await user.destroy({
				deletedBy: 1,
				deletedAt: new Date()
			});
		}).rejects.toThrow();

		await user.destroy({
			force: true
		});

	});

	test('isUserIdCityForeignKey_PerformingLazyAssociation_True', async () => {

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

		const city = await user.getCity();

		expect(city).not.toBeNull();

		expect(city).toEqual(expect.objectContaining({
			idCity: expect.any(Number),
			name: expect.any(String),
			stateAcronym: expect.any(String),
			idState: expect.any(Number)
		}));

		await user.destroy({
			force: true
		});
        
	});

	test('isUserIdCityForeignKey_PerformingEagerAssociation_True', async () => {

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

		const city = (await User.findByPk(user.idUser, { include: ['city'] })).city;

		expect(city).not.toBeNull();

		expect(city).toEqual(expect.objectContaining({
			idCity: expect.any(Number),
			name: expect.any(String),
			stateAcronym: expect.any(String),
			idState: expect.any(Number)
		}));

		await user.destroy({
			force: true
		});
        
	});

	test('isUserCreatedByForeignKey_PerformingLazyAssociation_True', async () => {

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

		const createdBy = await user.getUserCreatedBy();

		expect(createdBy).not.toBeNull();

		expect(createdBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserCreatedByForeignKey_PerformingEagerAssociation_True', async () => {

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

		const createdBy = (await User.findByPk(user.idUser, { include: ['userCreatedBy'] })).userCreatedBy;

		expect(createdBy).not.toBeNull();

		expect(createdBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserUpdatedByForeignKey_PerformingLazyAssociation_True', async () => {

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

		await user.update({ name: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		const updatedBy = await user.getUserUpdatedBy();

		expect(updatedBy).not.toBeNull();

		expect(updatedBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserUpdatedByForeignKey_PerformingEagerAssociation_True', async () => {

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

		await user.update({ name: DataBuilder.randomString(50) }, {
			updatedBy: 1
		});

		const updatedBy = (await User.findByPk(user.idUser, { include: ['userUpdatedBy'] })).userUpdatedBy;

		expect(updatedBy).not.toBeNull();

		expect(updatedBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserDeletedByForeignKey_PerformingLazyAssociation_True', async () => {

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

		await user.destroy({ deletedBy: 1 });

		const deletedBy = await user.getUserDeletedBy();

		expect(deletedBy).not.toBeNull();

		expect(deletedBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserDeletedByForeignKey_PerformingEagerAssociation_True', async () => {

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

		await user.destroy({ deletedBy: 1 });

		const deletedBy = (await User.findByPk(user.idUser, { include: ['userDeletedBy'],  paranoid: false })).userDeletedBy;

		expect(deletedBy).not.toBeNull();

		expect(deletedBy).toEqual(expect.objectContaining({
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

		await user.destroy({
			force: true
		});
        
	});

	test('isUserIdCompanyForeignKey_PerformingLazyAssociation_True', async () => {

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

		const company = await user.getCompany();

		expect(company).not.toBeNull();

		expect(company).toEqual(expect.objectContaining({
			idCompany: expect.any(Number),
			name: expect.any(String),
			code: expect.any(String),
			idApiKey: expect.any(Number)
		}));

		await user.destroy({
			force: true
		});
        
	});

	test('isUserIdCompanyForeignKey_PerformingEagerAssociation_True', async () => {

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

		const company = (await User.findByPk(user.idUser, { include: ['company'] })).company;

		expect(company).not.toBeNull();

		expect(company).toEqual(expect.objectContaining({
			idCompany: expect.any(Number),
			name: expect.any(String),
			code: expect.any(String),
			idApiKey: expect.any(Number)
		}));

		await user.destroy({
			force: true
		});
        
	});

});
