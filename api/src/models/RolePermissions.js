'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class RolePermissions extends Model {

		static associate(models) {

			RolePermissions.belongsTo(models.role, { 
				foreignKey: 'idRole'});
				
			RolePermissions.belongsTo(models.permission, {
				foreignKey: 'idRole'});
			
		}

	}

	RolePermissions.init({
		idRole: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idPermission: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, {
		sequelize,
		timestamps: false,
		modelName: 'rolePermissions',
		freezeTableName: true
	});

	return RolePermissions;
};
