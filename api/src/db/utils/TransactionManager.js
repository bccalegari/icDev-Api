const database = require('../../models');

/**
 * Transaction Manager Class
 * 
 * Responsible for handling database transactions
 * @category Database Utils
 */
class TransactionManager {
    
	/**
     * Database access (sequelize)
     * @private
     * @constant
     * @type { Sequelize }
     */
	#db;

	/**
     * Class constructor
     */
	constructor() {
		this.#db = database;
	}

	/**
     * Get database transaction
     * @returns { Promise<Transaction> } transaction
     */
	async getTransaction() {
		return await this.#db.sequelize.transaction();
	}

	/**
     * Commit database transaction
     * @param { Transaction } transaction
     * @returns { Promise<void> }
     */
	async commitTransaction(transaction) {
		await transaction.commit();
	}

	/**
     * Rollback database transaction
     * @param { Transaction } transaction
     * @returns { Promise<void> }
     */
	async rollbackTransaction(transaction) {
		await transaction.rollback();
	}

}

module.exports = TransactionManager;