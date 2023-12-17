const CompanyResponseDTO = require('./CompanyResponseDTO');

/**
 * Company DTO Factory Class
 * 
 * Responsible for creating new DTO's in the company context
 * @category DTOs
 */
class CompanyDTOFactory {

	/**
	 * Create an new company DTO to use data in response
	 * @param { Model<Company> } companyModel Company model
	 * @returns { CompanyResponseDTO } CompanyResponseDTO
	 */
	async createCompanyResponseDTO(companyModel) {
		
		const { idCompany, name, code } = companyModel;

		const { key } = await companyModel.getApiKey();

		const companyResponseDTO = new CompanyResponseDTO(idCompany, name, code, key);

		return companyResponseDTO;

	}

}

module.exports = CompanyDTOFactory;
