'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	class User extends Model {

		static associate(models) {

			User.belongsTo(models.city, {
				foreignKey: 'idCity'
			});
			
			User.hasOne(models.user, {
				foreignKey: 'createdBy',
				as: 'createdByUser'
			});

			User.hasOne(models.user, {
				foreignKey: 'updatedBy',
				as: 'updatedByUser'
			});

			User.hasOne(models.user, {
				foreignKey: 'deletedBy',
				as: 'deletedByUser'
			});

			User.belongsTo(models.company, {
				foreignKey: 'idCompany'
			});

		}
	}

	User.init({
		idUser: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		login: {
			type: DataTypes.STRING(30),
			allowNull: true,
			unique: true
		},
		password: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		salt: {
			type: DataTypes.STRING(32),
			allowNull: true
		},
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			unique: true
		},
		street: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		streetNumber: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		district: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING(14),
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		idCity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		updatedBy: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		deletedBy: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		idCompany: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		timestamps: false,
		modelName: 'user',
		freezeTableName: true
	});

	return User;
};
