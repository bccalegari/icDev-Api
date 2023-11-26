const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');
const ApiError = require('../../../errors/ApiError');

const AuthService = require('../../../services/AuthService');
const Company = require('../../../models/index').company;

describe('Auth Service Unit Tests', () => {

	const authService = new AuthService();

	test('isAuthServiceAuthenticateForRegisterCompanyCode_BeingValid_ReturningRegisterToken', async () => {

		const company = await Company.findByPk(1);

		const registerToken = await authService.authenticateForRegister(company.code);

		expect(registerToken).not.toBeNull();

	});

	test('isAuthServiceAuthenticateForRegisterCompanyCode_BeingInvalid_ThrowingException', async () => {

		expect(async () => {
			await authService.authenticateForRegister(DataBuilder.randomString(16));
		}).rejects.toThrow(ApiError);

	});


});
