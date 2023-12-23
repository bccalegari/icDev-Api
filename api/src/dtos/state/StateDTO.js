/**
 * State DTO
 * 
 * Represents a state object
 * @category DTOs
 */
class StateDTO {

	/**
      * State name
      * @type { String }
      */
	name;

	/**
       * State iso alpha 2
       * @type { String }
       */
	isoAlpha2;

	/**
     * Class constructor
     * @param { String } name state name
     * @param { StateDTO } isoAlpha2 state iso alpha 2
     */
	constructor(name, isoAlpha2) {
		this.name = name;
		this.isoAlpha2 = isoAlpha2;
	}

}

module.exports = StateDTO;
