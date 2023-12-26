'use strict';

const { Model, ValidationError } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Api Key Model
	 * @category Models
	 * @extends Model
	 */
	class ApiKey extends Model {

		static associate(models) {
			ApiKey.hasOne(models.company, {
				foreignKey: 'idApiKey'
			});
		}

	}

	ApiKey.init({
		idApiKey: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		key: {
			type: DataTypes.STRING(16),
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'Key is required'
				},
				notEmpty: {
					msg: 'Key is required'
				},
				len: {
					args: [16, 16],
					msg: 'Key must be 16 characters long'
				}
			},
			async isUnique(value) {
				return ApiKey.findOne({ where: { key: value } })
					.then((apiKey) => {
						if (apiKey) {
							throw new ValidationError('key already exists');
						}
					});
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'apiKey',
		freezeTableName: true
	});

	return ApiKey;
};
