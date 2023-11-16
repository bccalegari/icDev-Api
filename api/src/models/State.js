'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class State extends Model {

		static associate(models) {

			State.belongsTo(models.country, {
				foreignKey: 'idCountry',
			});

			State.hasMany(models.city, {
				foreignKey: 'idCity'
			});
		}

	}

	State.init({
		idState: {
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
		modelName: 'state',
		freezeTableName: true
	});

	return State;
};
