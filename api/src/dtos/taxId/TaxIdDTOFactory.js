const ApiError = require('../../errors/ApiError');
const UserTaxIdDTO = require('./UserTaxIdDTO');

/**
 * Tax Identification DTO Factory Class
 * 
 * Responsible for creating new DTO's in the tax identification context
 * @category DTOs
 */
class TaxIdDTOFactory {

	createUserTaxIdDTO(taxId, idUser, idCountry) {

		if (!taxId) {
			throw ApiError.badRequest('Tax identification is required');
		}

		return new UserTaxIdDTO(taxId, idUser, idCountry);

	}

}

module.exports = TaxIdDTOFactory;
