const CountryDTO = require('../country/CountryDTO');
const StateDTO = require('../state/StateDTO');
const CityResponseDTO = require('./CityResponseDTO');

/**
 * City DTO Factory Class
 * 
 * Responsible for creating new DTO's in the city context
 * @category DTOs
 */
class CityDTOFactory {

	/**
	 * Create an new city DTO to use data in response
	 * @param { Model<City> } cityModel City model
	 * @returns { CityResponseDTO } CityResponseDTO
	 */
	createCityResponseDTO(cityModel) {
		
		const { name, state } = cityModel;

		const { country } = state;

		const stateDTO = new StateDTO(state.name, state.isoAlpha2);

		const countryDTO = new CountryDTO(country.name, country.isoAlpha2, country.isoAlpha3);

		const cityResponseDTO = new CityResponseDTO(name, stateDTO, countryDTO);

		return cityResponseDTO;
	
	}

}

module.exports = CityDTOFactory;
