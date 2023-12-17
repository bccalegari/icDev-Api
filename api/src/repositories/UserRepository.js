const AbstractRepository = require('./AbstractRepository');

/**
 * User Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the user context
 * @category Repositories
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
	 * @param { String } login login of the user
	 * @returns { Promise<Model<User>> } user model
	 */
	async findUserByLogin(login) {
		return await super._getOneEagerElement({ login }, [ { model: this._getDatabaseModel('company'), include: [ 'apiKey' ] } ]);
	}
	
	/**
	 * Create a user
	 * @param { Object } user user data
	 * @param { Number } createdBy user id of the record creator, by default it is 1 (icDevRoot)
	 * @returns { Promise<Model<User>> } user inserted model
	 * @throws { Error } If the insert goes wrong
	 */
	async createUser(user, createdBy) {
		return await this._insertElement(user, createdBy);
	}

	/**
	 * Find user roles
	 * @param { Number } idUser user id
	 * @returns { Promise<Model<User>> } user roles model
	 */
	async findUserRolesByIdUser(idUser) {
		return (await super._getOneEagerElement({ idUser }, [{ model: this._getDatabaseModel('role') }])).roles;
	}

}

module.exports = UserRepository;
