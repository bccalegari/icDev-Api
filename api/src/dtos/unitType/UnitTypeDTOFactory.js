const UnitTypeResponseDTO = require('./UnitTypeResponseDTO');

/**
 * Unit Type DTO Factory Class
 * 
 * Responsible for creating new DTO's in the unit type context
 * @category DTOs
 */
class UnitTypeDTOFactory {

	/**
	 * Create an new city DTO to use data in response
	 * @param { Model<UnitType> } unitTypeModel Unit type model
	 * @returns { UnitTypeResponseDTO } Unit type DTO
	 */
	createUnitTypeResponseDTO(unitTypeModel) {
		
		const { name } = unitTypeModel;

		const unitTypeResponseDTO = new UnitTypeResponseDTO(name);

		return unitTypeResponseDTO;
	
	}

}

module.exports = UnitTypeDTOFactory;
