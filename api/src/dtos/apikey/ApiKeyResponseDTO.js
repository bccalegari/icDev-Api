/**
 * Api Key Response DTO
 * 
 * Represents a api key data to be used for response
 * @category DTOs
 */
class ApiKeyResponseDTO {

	/**
       * Api Key key
       * @type { String }
      */
	key;

	/**
     * Class constructor
     * @param { Number } key api key key
     */
	constructor(key) {
		this.key = key;
	}

}

module.exports = ApiKeyResponseDTO;
