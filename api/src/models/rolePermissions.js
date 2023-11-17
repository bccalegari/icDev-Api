'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class rolePermissions extends Model {

		static associate(models) {

			rolePermissions.belongsTo(models.role, { 
				foreignKey: 'idRole'});
				
			rolePermissions.belongsTo(models.permission, {
				foreignKey: 'idRole'});
			
		}

	}

	rolePermissions.init({
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

	return rolePermissions;
};
