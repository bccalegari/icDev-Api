/**
 * Company Response DTO
 * 
 * Represents a company data to be used for response
 * @category DTOs
 */
class CompanyResponseDTO {

	/**
     * Company id
     * @type { Number }
     */
	idCompany;

	/**
      * Company name
      * @type { String }
      */
	name;

	/**
      * Company code
      * @type { String }
      */
	code;

	/**
       * Company api key
       * @type { String }
      */
	apiKey;

	/**
     * Class constructor
     * @param { Number } idCompany id of the company 
     * @param { String } name name of the company
     * @param { String } code code of the company
     * @param { String } apiKey api key of the company
     */
	constructor(idCompany, name, code, apiKey) {
		this.idCompany = idCompany;
		this.name = name;
		this.code = code;
		this.apiKey = apiKey;
	}

}

module.exports = CompanyResponseDTO;
