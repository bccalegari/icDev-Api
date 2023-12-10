/**
 * User After Sign Up DTO
 * 
 * Represents an user data to be returned after registration
 */
class UserAfterSignUpDTO {
    
	/**
     * User name
     * @type { String }
     */
	name;

	/**
     * User last name
     * @type { String }
     */
	lastName;

	/**
     * User login
     * @type { String }
     */
	login;

	/**
     * User cpf
     * @type { String }
     */
	cpf;

	/**
     * User street
     * @type { String }
     */
	street;

	/**
     * User street number
     * @type { Number }
     */
	streetNumber;

	/**
     * User district
     * @type { String }
     */
	district;

	/**
     * User city
     * @type { String }
     */
	city;

	/**
     * User birth date
     * @type { String }
     */
	birthDate;

	/**
     * User phone
     * @type { String }
     */
	phone;

	/**
     * User email
     * @type { String }
     */
	email;

	/**
     * User company
     * @type { String }
     */
	company;

	/**
     * User created date
     * @type { String }
     */
	createdAt;

	/**
     * Class constructor
     * @param { Model } user 
     */
	constructor(name, lastName, login, cpf, street, streetNumber, district, city, birthDate, phone, email, company, createdAt) {
		this.name = name;
		this.lastName = lastName;
		this.login = login;
		this.cpf = cpf;
		this.street = street;
		this.streetNumber = streetNumber;
		this.district = district; 
		this.city = city;
		this.birthDate = birthDate;
		this.phone = phone;
		this.email = email;
		this.company = company;
		this.createdAt = createdAt;
	}

}

module.exports = UserAfterSignUpDTO;
