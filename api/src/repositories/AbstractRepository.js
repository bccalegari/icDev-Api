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
     * @type { Sequelize }
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
      * @returns { Model } model
      */
	getDatabaseModel(model) {
		return this.#db[model];
	}

	/**
     * Get all elements (Lazy Loading)
     * @abstract
     * @param { Object } where 
     * @param { Array<String> } attributes
     * @returns { Promise<(Array<Model>)> }
     */
	async getAllLazyElements(where = {}, attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findAll({ where: { ...where } , attributes: [ ...attributes ] });		
		}

		return await this.#db[this.model].findAll({ where: { ...where } });
	}

	/**
     * Get all elements (Eager Loading)
     * @param { Object } where 
     * @param { Object|String } includes
     * @param { Array<String> } attributes
     * @returns { Promise<(Array<Model>)> }
     */
	async getAllEagerElements(where = {}, includes = [], attributes=[]) {
		return await this.#db[this.model].findAll({ where: { ...where } , include: [ ...includes ] , attributes: [ ...attributes ] });
	}

	/**
     * Get one element (Lazy Loading)
     * @param { Object } where 
     * @param { Array<String> } attributes
     * @returns { Promise<Model> }
     */
	async getOneLazyElement(where = {}, attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, attributes: [ ...attributes ] });	
		}

		return await this.#db[this.model].findOne({ where: { ...where } });
	}

	/**
     * Get one element (Eager Loading)
     * @param { Object } where 
     * @param { Object|String } includes
     * @param { Array<String> } attributes
     * @returns { Promise<Model> }
     */
	async getOneEagerElement(where = {}, includes = [], attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where } , include: [ ...includes ] , attributes: [ ...attributes ] });
		}

		return await this.#db[this.model].findOne({ where: { ...where } , include: [ ...includes ] });
	}


	/**
      * Insert an element
      * @param { Object } elementData 
      * @param { Number } createdBy User id of the record creator, by default it is 1 (icDevRoot)
      * @returns { Promise<Model> } element
      * @throws { Error } If elementData is empty or wrong and when transaction is not found
      */
	async insertElement(elementData = {}, createdBy = 1) {

		if (!elementData) {
			throw new Error('Empty element data');
		}

		return await this.#db.sequelize.transaction(async t => {
			return await this.#db[this.model].create(elementData, { createdBy: createdBy, transaction: t });
		});
        
	}

}

module.exports = AbstractRepository;
