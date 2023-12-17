/**
 * User Sign Up Response DTO
 * 
 * Represents an user data to be returned after registration
 */
class UserSignUpResponseDTO {
    
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
     * User complement
     * @type { String }
     */
	complement;

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
     * @param { String } name user name
     * @param { String } lastName user last name
     * @param { String } login user login
     * @param { String } cpf user cpf
     * @param { String } street user street
     * @param { Number } streetNumber user street number
     * @param { String } district user district
     * @param { String } complement user complement
     * @param { String } city user city
     * @param { String } birthDate user birth date
     * @param { String } phone user phone
     * @param { String } email user email
     * @param { String } company user company
     * @param { String } createdAt user created date
     */
	constructor(name, lastName, login, cpf, street, streetNumber, district, complement=null, city, birthDate, phone, email, company, createdAt) {
		this.name = name;
		this.lastName = lastName;
		this.login = login;
		this.cpf = cpf;
		this.street = street;
		this.streetNumber = streetNumber;
		this.district = district; 
		this.complement = complement;
		this.city = city;
		this.birthDate = birthDate;
		this.phone = phone;
		this.email = email;
		this.company = company;
		this.createdAt = createdAt;
	}

}

module.exports = UserSignUpResponseDTO;
