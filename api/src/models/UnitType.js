'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Unit Type Model
	 * @category Models
	 * @extends Model
	 */
	class UnitType extends Model {

		//TODO implement unit type association with unit

	}

	UnitType.init({
		idUnitType: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Name is required'
				},
				notEmpty: {
					msg: 'Name is required'
				},
				len: {
					args: [0, 50],
					msg: 'Name must be less than 50 characters'
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'unitType',
		freezeTableName: true
	});

	return UnitType;
};
