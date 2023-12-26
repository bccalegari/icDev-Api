const database = require('../models');

/**
 * Abstract Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence
 * @abstract abstract class
 * @category Repositories
 */
class AbstractRepository {

	/**
     * Database access (sequelize | models)
     * @private
     * @constant
     * @type { Sequelize }
     */
	#db;

	/**
     * Abstract Repository Class Constructor
     * @param { String } model name of the model
     */
	constructor(model) {
		this.#db = database;
		this.model = model;
	}

	/**
      * Return a database model
	  * @protected protected method
      * @param { String } model name of the model
      * @returns { Model } model
      */
	_getDatabaseModel(model) {
		return this.#db[model];
	}

	/**
	 * Get database transaction
	 * @protected protected method
	 * @returns { Promise<Transaction> } transaction
	 */
	async _getTransaction() {
		return await this.#db.sequelize.transaction();
	}

	/**
	 * Commit database transaction
	 * @protected protected method
	 * @param { Transaction } transaction
	 * @returns { Promise<void> }
	 */
	async _commitTransaction(transaction) {
		await transaction.commit();
	}

	/**
	 * Rollback database transaction
	 * @protected protected method
	 * @param { Transaction } transaction
	 * @returns { Promise<void> }
	 */
	async _rollbackTransaction(transaction) {
		await transaction.rollback();
	}

	/**
	 * Get element by pk (Lazy Loading)
	 * @protected protected method
	 * @param { Number } pk element pk
	 * @returns { Promise<Model> } element
	 */
	async _getLazyElementByPk(pk) {
		return await this.#db[this.model].findByPk(pk);
	}

	/**
     * Get all elements (Lazy Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<(Array<Model>)> }
     */
	async _getAllLazyElements(where = {}, attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findAll({ where: { ...where }, attributes: [ ...attributes ],  ...options });		
		}

		return await this.#db[this.model].findAll({ where: { ...where },  ...options });
	}

	/**
     * Get all elements (Eager Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Object|String } includes join clause
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<(Array<Model>)> }
     */
	async _getAllEagerElements(where = {}, includes = [], attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findAll({ where: { ...where }, include: [ ...includes ], attributes: [ ...attributes ], ...options });
		}

		return await this.#db[this.model].findAll({ where: { ...where }, include: [ ...includes ], ...options });
	}

	/**
     * Get one element (Lazy Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<Model> }
     */
	async _getOneLazyElement(where = {}, attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, attributes: [ ...attributes ], ...options });	
		}

		return await this.#db[this.model].findOne({ where: { ...where }, ...options });
	}

	/**
     * Get one element (Eager Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Object|String } includes join clause
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<Model> }
     */
	async _getOneEagerElement(where = {}, includes = [], attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, include: [ ...includes ], attributes: [ ...attributes ], ...options });
		}

		return await this.#db[this.model].findOne({ where: { ...where }, include: [ ...includes ], ...options });
	}

	/**
      * Insert an element
	  * @protected protected method
      * @param { Object } elementData element data
	  * @param { Transaction } transaction database transaction, if not passed, the transaction will be managed by the method
	  * @param { Number } createdBy User id of the record creator, by default it is 1 (icDevRoot)
      * @returns { Promise<Model> } element
      * @throws { Error } If elementData is empty or wrong and when transaction goes wrong
      */
	async _insertElement(elementData = {}, transaction = null, createdBy = 1) {

		if (!elementData) {
			throw new Error('Empty element data');
		}

		if (!transaction) {
			return await this.#db.sequelize.transaction(async t => {
				return await this.#db[this.model].create(elementData, { createdBy: createdBy, transaction: t });
			});
		}

		return await this.#db[this.model].create(elementData, { createdBy: createdBy, transaction: transaction });

	}

	/**
	 * Update an element
	 * @protected protected method
	 * @param { Object } elementData 
	 * @param { Object } where 
	 * @param { Number } updatedBy 
	 * @returns { Promise<Model> } element
	 * @throws { Error } If elementData is empty or wrong and when transaction goes wrong
	 */
	async _updateElement(elementData = {}, where = {}, updatedBy = 1) {
		
		if (!elementData) {
			throw new Error('Empty element data');
		}

		return await this.#db.sequelize.transaction(async t => {
			return await this.#db[this.model].update(elementData, { where: { ...where }, updatedBy: updatedBy, transaction: t });
		});
		
	}

}

module.exports = AbstractRepository;
