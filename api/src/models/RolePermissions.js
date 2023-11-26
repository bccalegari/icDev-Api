'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class RolePermissions extends Model {

		static associate(models) {

			RolePermissions.belongsTo(models.role, { 
				foreignKey: 'idRole'});
				
			RolePermissions.belongsTo(models.permission, {
				foreignKey: 'idPermission'});
			
		}

	}

	RolePermissions.init({
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
		idPermission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idPermission is required'
				},
				isInt: {
					msg: 'idPermission must be an integer'
				}
			}
		},
	}, {
		sequelize,
		timestamps: false,
		modelName: 'rolePermissions',
		freezeTableName: true
	});

	return RolePermissions;
};
