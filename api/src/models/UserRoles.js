'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * User Roles Model
	 * @extends Model
	 */
	class UserRoles extends Model {

		static associate(models) {

			UserRoles.belongsTo(models.user, { 
				foreignKey: 'idUser'});
				
			UserRoles.belongsTo(models.role, {
				foreignKey: 'idRole'});
			
		}

	}

	UserRoles.init({
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idUser is required'
				},
				isInt: {
					msg: 'idUser must be an integer'
				}
			}
		},
		idRole: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idRole is required'
				},
				isInt: {
					msg: 'idRole must be an integer'
				}
			}
		},
	}, {
		sequelize,
		timestamps: false,
		modelName: 'userRoles',
		freezeTableName: true
	});

	return UserRoles;
};
