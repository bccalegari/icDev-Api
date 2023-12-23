/**
 * Country DTO
 * 
 * Represents a country object
 * @category DTOs
 */
class CountryDTO {

	/**
      * Country name
      * @type { String }
      */
	name;

	/**
       * Country iso alpha 2
       * @type { String }
       */
	isoAlpha2;

	/**
       * Country iso alpha 3
       * @type { String }
       */
	isoAlpha3;

	/**
     * Class constructor
     * @param { String } name country name
     * @param { String } isoAlpha2 country iso alpha 2
     * @param { String } isoAlpha3 country iso alpha 3
     */
	constructor(name, isoAlpha2, isoAlpha3) {
		this.name = name;
		this.isoAlpha2 = isoAlpha2;
		this.isoAlpha3 = isoAlpha3;
	}

}

module.exports = CountryDTO;
