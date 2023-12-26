/**
 * User Sign Up Request DTO
 * 
 * Represents an user data to be used for registration
 */
class UserSignUpRequestDTO {
    
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
     * User password
     * @type { String }
     */
	password;

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
      * User zip code
      * @type { String }
      */
	zipCode;

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
     * User city id
     * @type { Number }
     */
	idCity;

	/**
     * User company id
     * @type { Number }
     */
	idCompany;

	/**
     * Class constructor
     * @param { String } name user name
     * @param { String } lastName user last name
     * @param { String } login user login
     * @param { String } password user password
     * @param { String } street user street
     * @param { Number } streetNumber user street number
     * @param { String } district user district
     * @param { String } complement user complement
     * @param { String } zipCode user zip code
     * @param { String } birthDate user birth date
     * @param { String } phone user phone
     * @param { String } email user email
     * @param { Number } idCity user city id
     * @param { Number } idCompany user company id
     */
	constructor(name, lastName, login, password, street, streetNumber, district, complement, zipCode, birthDate, phone, email, idCity, idCompany) {
		this.name = name;
		this.lastName = lastName;
		this.login = login;
		this.password = password;
		this.street = street;
		this.streetNumber = streetNumber;
		this.district = district; 
		this.complement = complement;
		this.zipCode = zipCode;
		this.birthDate = birthDate;
		this.phone = phone;
		this.email = email;
		this.idCity = idCity;
		this.idCompany = idCompany;
	}

}

module.exports = UserSignUpRequestDTO;
