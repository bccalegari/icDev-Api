'use strict';

const { Model, ValidationError } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Unit TaxId Model
	 * @category Models
	 * @extends Model
	 */
	class UnitTaxId extends Model {

		static associate(models) {

			/* TODO - Implement unit model
			UnitTaxId.belongsTo(models.unit, {
				foreignKey: 'idUnit'
			});
			*/

			UnitTaxId.belongsTo(models.country, {
				foreignKey: 'idCountry'
			});

		}

	}

	UnitTaxId.init({
		idUnitTaxId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		taxId: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'taxId is required'
				},
				notEmpty: {
					msg: 'taxId is required'
				},
				len: {
					args: [0, 255],
					msg: 'taxId must be less than 255 characters'
				}
			}
		},
		idUnit: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'idUnit is required'
				},
				isInt: {
					msg: 'idUnit must be an integer'
				},
				async isUnique(value) {
					if (value != null) {
						return UnitTaxId.findOne({ where: { idUnit: value } })
							.then((unitTaxId) => {
								if (unitTaxId) {
									throw new ValidationError('idUnit already exists');
								}
							});

					}
				}
			}
		},
		idCountry: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idCountry is required'
				},
				isInt: {
					msg: 'idCountry must be an integer'
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'unitTaxId',
		freezeTableName: true
	});

	return UnitTaxId;
};
