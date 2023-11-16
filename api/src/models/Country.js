'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class Country extends Model{

		static associate (models) {
			Country.hasMany(models.state, {
				foreignKey: 'idCountry'
			});
		}
		
	}

	Country.init({
		idCountry: {
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
		},
		isoAlpha2: {
			type: DataTypes.STRING(2),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'isoAlpha2 is required'
				},
				notEmpty: {
					msg: 'isoAlpha2 is required'
				},
				len: {
					args: [2, 2],
					msg: 'isoAlpha2 must be 2 characters long'
				}
			}
		},
		isoAlpha3: {
			type: DataTypes.STRING(3),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'isoAlpha3 is required'
				},
				notEmpty: {
					msg: 'isoAlpha3 is required'
				},
				len: {
					args: [3, 3],
					msg: 'isoAlpha3 must be 3 characters long'
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'country',
		freezeTableName: true
	});

	return Country;
};
