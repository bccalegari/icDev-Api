/**
 * Unit type Response DTO
 * 
 * Represents a unit type data to be used for response
 * @category DTOs
 */
class UnitTypeResponseDTO {

	/**
      * Unit type
      * @type { String }
      */
	name;

	/**
     * Class constructor
     * @param { String } name Unit type
     */
	constructor(name) {
		this.name = name;
	}

}

module.exports = UnitTypeResponseDTO;
