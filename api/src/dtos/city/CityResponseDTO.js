/**
 * City Response DTO
 * 
 * Represents a city data to be used for response
 * @category DTOs
 */
class CityResponseDTO {

	/**
      * City name
      * @type { String }
      */
	city;

	/**
       * City state DTO
       * @type { StateDTO }
       */
	state;

	/**
       * City country DTO
       * @type { CountryDTO }
       */
	country;

	/**
     * Class constructor
     * @param { String } city city name
     * @param { StateDTO } state city state
     * @param { CountryDTO } country city country
     */
	constructor(city, state, country) {
		this.city = city;
		this.state = state;
		this.country = country;
	}

}

module.exports = CityResponseDTO;
