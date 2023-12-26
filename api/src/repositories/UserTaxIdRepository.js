const { Op } = require('sequelize');
const AbstractRepository = require('./AbstractRepository');

/**
 * User Tax Identification Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the user tax identification context
 * @category Repositories
 * @extends AbstractRepository
 */
class UserTaxIdRepository extends AbstractRepository {

	/**
     * User Tax Identification Class Constructor
     */
	constructor() {
		super('userTaxId');
	}

	/**
	 * Find user tax identification by user id
	 * @param { Number } idUser user id
	 * @returns { Promise<UserTaxId> } user tax identification
	 */
	async findUserTaxIdByUserId(idUser) {
		return await super._getLazyElement({ idUser: idUser });
	}

	/**
	 * Create user tax identification
	 * @param { Object } userTaxId user tax identification data
	 * @param { Transaction } transaction database transaction, by default it is null
	 * @returns { Promise<UserTaxId> } user tax identification
	 */
	async createUserTaxId(userTaxId, transaction=null) {
		return await super._insertElement(userTaxId, transaction);
	}

	/**
	 * Find user tax identification by tax id and country id
	 * @param { String } taxId tax id
	 * @param { Number } idCountry country id
	 * @returns { Promise<UserTaxId> } user tax identification
	 */
	async findUserTaxIdByTaxIdAndIdCountry(taxId, idCountry) {
		return await super._getOneLazyElement({ [Op.and]: { taxId, idCountry } });
	}

}

module.exports = UserTaxIdRepository;
