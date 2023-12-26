/**
 * User Tax Identification DTO
 * 
 * Represents a user tax identification object
 * @category DTOs
 */
class UserTaxIdDTO {

	/**
     * User tax identification
     * @type { String }
     */
	taxId;

	/**
     * User id
     * @type { Number }
     */
	idUser;

	/**
     * Country id
     * @type { Number }
     */
	idCountry;

	/**
     * Class constructor
     * @param { String } taxId User tax identification
     * @param { String } idUser User id
     * @param { String } idCountry Country id
     */
	constructor(taxId, idUser, idCountry) {
		this.taxId = taxId;
		this.idUser = idUser;
		this.idCountry = idCountry;
	}

}

module.exports = UserTaxIdDTO;
