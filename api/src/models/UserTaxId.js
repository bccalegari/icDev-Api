'use strict';

const { Model, ValidationError } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * User TaxId Model
	 * @category Models
	 * @extends Model
	 */
	class UserTaxId extends Model {

		static associate(models) {

			UserTaxId.belongsTo(models.user, {
				foreignKey: 'idUser'
			});

			UserTaxId.belongsTo(models.country, {
				foreignKey: 'idCountry'
			});

		}

	}

	UserTaxId.init({
		idUserTaxId: {
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
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idUser is required'
				},
				isInt: {
					msg: 'idUser must be an integer'
				},
				async isUnique(value) {
					if (value != null) {
						return UserTaxId.findOne({ where: { idUser: value } })
							.then((userTaxId) => {
								if (userTaxId) {
									throw new ValidationError('idUser already exists');
								}
							});

					}
				}
			}
		},
		idCountry: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
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
		modelName: 'userTaxId',
		freezeTableName: true
	});

	return UserTaxId;
};
