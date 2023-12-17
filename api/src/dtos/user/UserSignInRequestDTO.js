/**
 * User Sign In Request DTO
 * 
 * Represents an user data to be used for login
 */
class UserSignInRequestDTO {

	/**
     * User login
     * @type { String }
     */
	login;

	/**
     * User password
     * @type { String }
     */
	password;

	/**
     * Class constructor
     * @param { String } login user login
     * @param { String } password user password 
     */
	constructor(login, password) {
		this.login = login;
		this.password = password;
	}

}

module.exports = UserSignInRequestDTO;
