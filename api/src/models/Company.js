'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	/**
	 * Company Model
	 * @extends Model
	 */
	class Company extends Model {

		static associate(models) {
			
			Company.belongsTo(models.apiKey, {
				foreignKey: 'idApiKey'
			});

			Company.hasMany(models.user, {
				foreignKey: 'idCompany'
			});
		}

	}

	Company.init({
		idCompany: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Name is required'
				},
				notEmpty: {
					msg: 'Name is required'
				},
				len: {
					args: [0, 255],
					msg: 'Name must be less than 255 characters'
				}
			}
		},
		code: {
			type: DataTypes.STRING(16),
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'Code is required'
				},
				notEmpty: {
					msg: 'Code is required'
				},
				len: {
					args: [0, 16],
					msg: 'Code must be less than 16 characters'
				},
				isUnique(value) {
					return Company.findOne({ where: { code: value } })
						.then((company) => {
							if (company) {
								throw new Error('code already exists');
							}
						});
				}
			}
		},
		idApiKey: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			validate: {
				isInt: {
					msg: 'idApiKey must be an integer'
				},
				isUnique(value) {
					return Company.findOne({ where: { idApiKey: value } })
						.then((company) => {
							if (company) {
								throw new Error('idApiKey already exists');
							}
						});
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'company',
		freezeTableName: true
	});

	return Company;
};
