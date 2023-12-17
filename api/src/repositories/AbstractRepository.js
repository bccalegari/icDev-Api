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
     * @returns { Promise<(Array<Model>)> }
     */
	async _getAllLazyElements(where = {}, attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findAll({ where: { ...where } , attributes: [ ...attributes ] });		
		}

		return await this.#db[this.model].findAll({ where: { ...where } });
	}

	/**
     * Get all elements (Eager Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Object|String } includes join clause
     * @param { Array<String> } attributes columns to select
     * @returns { Promise<(Array<Model>)> }
     */
	async _getAllEagerElements(where = {}, includes = [], attributes=[]) {
		return await this.#db[this.model].findAll({ where: { ...where } , include: [ ...includes ] , attributes: [ ...attributes ] });
	}

	/**
     * Get one element (Lazy Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Array<String> } attributes columns to select
     * @returns { Promise<Model> }
     */
	async _getOneLazyElement(where = {}, attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, attributes: [ ...attributes ] });	
		}

		return await this.#db[this.model].findOne({ where: { ...where } });
	}

	/**
     * Get one element (Eager Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Object|String } includes join clause
     * @param { Array<String> } attributes columns to select
     * @returns { Promise<Model> }
     */
	async _getOneEagerElement(where = {}, includes = [], attributes=[]) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where } , include: [ ...includes ] , attributes: [ ...attributes ] });
		}

		return await this.#db[this.model].findOne({ where: { ...where } , include: [ ...includes ] });
	}

	/**
      * Insert an element
	  * @protected protected method
      * @param { Object } elementData element data
      * @param { Number } createdBy User id of the record creator, by default it is 1 (icDevRoot)
      * @returns { Promise<Model> } element
      * @throws { Error } If elementData is empty or wrong and when transaction goes wrong
      */
	async _insertElement(elementData = {}, createdBy = 1) {

		if (!elementData) {
			throw new Error('Empty element data');
		}

		return await this.#db.sequelize.transaction(async t => {
			return await this.#db[this.model].create(elementData, { createdBy: createdBy, transaction: t });
		});
        
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
