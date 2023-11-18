const AbstractRepository = require('./AbstractRepository');


/**
 * User Repository Class
 * @extends AbstractRepository
 */
class UserRepository extends AbstractRepository {

	/**
     * User Repository Class Constructor
     */
	constructor() {
		super('user');
	}

}

module.exports = UserRepository;
