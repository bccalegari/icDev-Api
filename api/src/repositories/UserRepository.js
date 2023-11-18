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
		const user = await super.getOneEagerElement({login: login}, {model: this.getDatabaseModel('company'), include: 'apiKey'});
		return user;
	}

}

module.exports = UserRepository;
