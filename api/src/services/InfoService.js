const CityRepository = require('../repositories/CityRepository');
const ApiError = require('../errors/ApiError');
const { logger } = require('../utils/logger');
const CityDTOFactory = require('../dtos/city/CityDTOFactory');
const UnitTypeRepository = require('../repositories/UnitTypeRepository');
const UnitTypeDTOFactory = require('../dtos/unitType/UnitTypeDTOFactory');

/**
 * Info Service Class
 * 
 * Responsible for handling all business logic of static information to be used in requests context
 * @category Services
 */
class InfoService {

	/**
     * City Repository
     * @private
     * @constant
     * @type { CityRepository }
     */
	#cityRepository;

	/**
	 * City DTO Factory
	 * @private
	 * @constant
	 * @type { CityDTOFactory }
	 */
	#cityDTOFactory;

	/**
	 * Unit Type Repository
	 * @private
	 * @constant
	 * @type { UnitTypeRepository }
	 */
	#unitTypeRepository;

	/**
	 * Unit Type DTO Factory
	 * @private
	 * @constant
	 * @type { UnitTypeDTOFactory }
	 */
	#unitTypeDTOFactory;

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories and dto factories
     */
	constructor() {
		this.#cityRepository = new CityRepository();
		this.#cityDTOFactory = new CityDTOFactory();
		this.#unitTypeRepository = new UnitTypeRepository();
		this.#unitTypeDTOFactory = new UnitTypeDTOFactory();
	}

	/**
	 * Get all cities
	 * @param { string } cityName city name to be searched
	 * @param { number } offset offset of cities to be returned
	 * @param { number } limit limit of cities to be returned, default 50
	 * @returns { Promise<Array<CityResponseDTO>> } cities
	 */
	async getAllCities(cityName, offset, limit=50) {

		logger.trace('=== Getting all cities ===');

		try {

			if (cityName) cityName = '%'.concat(cityName.concat('%'));

			offset = parseInt(offset) || 0;

			const cities = await this.#cityRepository.findAllCitiesPaginated(cityName, offset, limit);

			const citiesResponseDTOs = [];

			cities.forEach(city => {

				citiesResponseDTOs.push(this.#cityDTOFactory.createCityResponseDTO(city));

			});

			logger.trace('=== All cities get with success ===');
               
			return citiesResponseDTOs;

		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}
	
	async getAllUnitTypes() {

		logger.trace('=== Getting all unit types ===');

		try {

			const unitTypes = await this.#unitTypeRepository.findAllUnitTypes();

			const unitTypesResponseDTOs = [];

			unitTypes.forEach(unitType => {

				unitTypesResponseDTOs.push(this.#unitTypeDTOFactory.createUnitTypeResponseDTO(unitType));

			});

			logger.trace('=== All unit types get with success ===');

			return unitTypesResponseDTOs;

		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}

}

module.exports = InfoService;
