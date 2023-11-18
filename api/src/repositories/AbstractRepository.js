/**
 * Abstract Repository Class
 */
class AbstractRepository {

	/**
     * Database access (sequelize | models)
     * @private
     * @constant
     * @type { Object }
     */
	#db;

	/**
     * Abstract Repository Class Constructor
     * @param { String } model 
     */
	constructor(model) {
		this.#db = require('./models');
		this.model = model;
	}

	/**
     * Create a transaction
     * @returns { Transaction } transaction 
     */
	async createTransaction() {
		return this.#db.sequelize.transaction();
	}

	/**
     * Commit an transaction
     * @param { Transaction } transaction 
     * @returns { Promise<void> }
     */
	async commitTransaction(transaction) {
		return transaction.commit();
	}

	/**
     * Rollback an transaction
     * @param { Transaction } transaction 
     * @returns { Promise<void> }
     */
	async rollbackTransaction(transaction) {
		return transaction.rollback();
	}

	/**
     * Get all elements (Lazy Loading)
     * @abstract
     * @param { Object } where 
     * @returns { Promise<(Array<Model>)> }
     */
	async getAllLazyElements(where = {}) {
		return this.#db[this.model].findAll({ where: { ...where } });
	}

	/**
     * Get all elements (Eager Loading)
     * @param { * } where 
     * @param { * } includes 
     * @returns { Promise<(Array<Model>)> }
     */
	async getAllEagerElements(where = {}, includes = []) {
		return this.#db[this.model].findAll({ where: { ...where } , include: [ ...includes ] });
	}

	/**
     * Get one element (Lazy Loading)
     * @param { * } where 
     * @returns { Promise<Model> }
     */
	async getOneLazyElement(where = {}) {
		return this.#db[this.model].findOne({ ...where });
	}

	/**
     * Get one element (Eager Loading)
     * @param { * } where 
     * @param { * } includes
     * @returns { Promise<Model> }
     */
	async getOneEagerElement(where = {}, includes = []) {
		return this.#db[this.model].findOne({  where: { ...where } , include: [ ...includes ] });
	}
}

module.exports = AbstractRepository;
