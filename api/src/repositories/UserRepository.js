const AbstractRepository = require('./AbstractRepository');

/**
 * User Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the user context
 * @extends AbstractRepository
 */
class UserRepository extends AbstractRepository {

	/**
     * User Repository Class Constructor
     */
	constructor() {
		super('user');
	}

	/**
	 * Find user by login
	 * @param { String } login 
	 * @returns { Model }
	 */
	async findUserByLogin(login) {
		return await super.getOneEagerElement({ login }, [ { model: this.getDatabaseModel('company'), include: [ 'apiKey' ] } ]);
	}
	
	/**
	 * Create a user
	 * @param { Object } user user data
	 * @returns { Promise<Model> } user inserted
	 * @throws { Error } If the insert goes wrong
	 */
	async createUser(user) {
		return this.insertElement(user);
	}

}

module.exports = UserRepository;
