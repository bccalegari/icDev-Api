'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Role Model
	 * @extends Model
	 */
	class Role extends Model {

		static associate(models) {

			Role.belongsToMany(models.user, { 
				foreignKey: 'idRole',
				through: 'userRoles'});

			Role.belongsToMany(models.permission, {
				foreignKey: 'idRole',
				through: 'rolePermissions'});
			
		}

	}

	Role.init({
		idRole: {
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
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: {
					args: [0, 255],
					msg: 'Description must be less than 255 characters'
				}
			}
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'role',
		freezeTableName: true
	});

	return Role;
};
