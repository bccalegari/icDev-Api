'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
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
		idApiKey: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			validate: {
				isInt: {
					msg: 'idApiKey must be an integer'
				},
				isUnique(value) {
					return Company.findOne({where:{idApiKey:value}})
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
