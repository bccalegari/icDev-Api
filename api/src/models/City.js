'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class City extends Model {

		static associate(models) {

			City.belongsTo(models.state, {
				foreignKey: 'idState',
			});

			City.hasMany(models.user, {
				foreignKey: 'idCity',
			});
			
		}

	}

	City.init({
		idCity: {
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
		stateAcronym: {
			type: DataTypes.STRING(2),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'stateAcronym is required'
				},
				notEmpty: {
					msg: 'stateAcronym is required'
				},
				len: {
					args: [2, 2],
					msg: 'stateAcronym must be 2 characters long'
				}
			}
		},
		idState: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idState is required'
				},
				isInt: {
					msg: 'idState must be an integer'
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'city',
		freezeTableName: true
	});

	return City;
};
