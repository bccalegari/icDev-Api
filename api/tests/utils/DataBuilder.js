const crypto = require('crypto');

/**
 * Data Builder Class
 * 
 * Utility class to generate random data
 */
class DataBuilder {

	/**
     * Generates a random string
     * @param { Number } length length of string, default is 255
     * @returns { String } Random String
     */
	static randomString(length=(this.randomInteger(null, 255))) {
		return (crypto.randomBytes((Math.ceil(length / 2))).toString('hex')).substring(0, length);
	}

	/**
     * Generates a random integer
     * @param { Number } min minimum value, default is 0
     * @param { Number } max maximum value, default is 1000
     * @returns { Number } Random Integer
     */
	static randomInteger(min=0, max=1000) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
     * Generates a random float
     * @param { Number} min minimum value, default is 0
     * @param { Number} max maximum value, default is 1000
     * @param { Number } decimalPlaces 
     * @returns { Number } Random Float
     */
	static randomFloat(min=0, max=1000, decimalPlaces=2) {
		const str = (Math.random() * (max - min) + min).toFixed(decimalPlaces);
		return parseFloat(str);
	}

	/**
     * Generates a random boolean
     * @returns { Boolean } Random Boolean
     */
	static randomBoolean() {
		return !!(Math.random());
	}

	/**
     * Generates a random date
     * @param { Date } start start date, default is 1900-01-01
     * @param { Date } end end date, default is now
     * @returns { Date } Random Date
     */
	static randomDate(start=(new Date(1900, 1, 1)), end=(new Date())) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	/**
      * Generates a random email
	  * @param { String } emailUsernameLength length of email username, default is 20
	  * @param { String } emailDomainLength length of email domain, default is 5
      * @returns { String } Random Email
      */
	static randomEmail(emailUsernameLength=20, emailDomainLength=5) {
		return `${this.randomString(emailUsernameLength)}@${this.randomString(emailDomainLength)}.com`;
	}

}

module.exports = DataBuilder;
