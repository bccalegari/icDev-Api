const database = require('../models');

/**
 * Abstract Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence
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
		this.#db = database;
		this.model = model;
	}

	/**
      * Return a database model
      * @param { String } model 
      * @returns { Object } model
      */
	getDatabaseModel(model) {
		return this.#db[model];
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
     * @param { Object } where 
     * @param { Object|String } includes
     * @returns { Promise<(Array<Model>)> }
     */
	async getAllEagerElements(where = {}, includes = []) {
		return this.#db[this.model].findAll({ where: { ...where } , include: [ ...includes ] });
	}

	/**
     * Get one element (Lazy Loading)
     * @param { Object } where 
     * @returns { Promise<Model> }
     */
	async getOneLazyElement(where = {}) {
		return this.#db[this.model].findOne({ where: { ...where } });
	}

	/**
     * Get one element (Eager Loading)
     * @param { Object } where 
     * @param { Object|String } includes
     * @returns { Promise<Model> }
     */
	async getOneEagerElement(where = {}, includes = []) {
		return this.#db[this.model].findOne({  where: { ...where } , include: [ ...includes ] });
	}


	/**
      * Insert an element
      * @param { Object } elementData 
      * @returns { Promise<Model> } element
      * @throws { Error } If elementData is empty or wrong and when transaction is not found
      */
	async insertElement(elementData = {}) {

		if (!elementData) {
			throw new Error('Empty element data');
		}

		await this.#db.sequelize.transaction(async t => {
			await this.#db[this.model].create(elementData, { transaction: t });
		});
        
	}

}

module.exports = AbstractRepository;
