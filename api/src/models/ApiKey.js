'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Api Key Model
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
				len: {
					args: [16, 16],
					msg: 'Key must be 16 characters long'
				}
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
