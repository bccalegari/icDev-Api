const Service = require('./Service');

/**
 * User Service
 * @extends Service
 */
class UserService extends Service {

	/**
     * User Service Class Constructor
     */
	constructor() {
		super('user');
	}

}

module.exports = UserService;
