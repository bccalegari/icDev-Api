'use strict';

const { Model, ValidationError } = require('sequelize');

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

			User.belongsToMany(models.role, {
				foreignKey: 'idUser',
				through: 'userRoles' });

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
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'lastName is required'
				},
				notEmpty: {
					msg: 'lastName is required'
				},
				len: {
					args: [0, 50],
					msg: 'lastName must be less than 50 characters'
				}
			}
		},
		login: {
			type: DataTypes.STRING(30),
			allowNull: true,
			unique: true,
			validate: {
				len: {
					args: [0, 30],
					msg: 'login must be less than 30 characters'
				},
				isUnique(value) {
					if (value != null) {
						return User.findOne({ where: { login: value } })
							.then((company) => {
								if (company) {
									throw new Error('login already exists');
								}
							});

					}
				}
			}
		},
		password: {
			type: DataTypes.STRING(80),
			allowNull: true,
			validate: {
				len: {
					args: [0, 80],
					msg: 'password must be less than 32 characters'
				}
			}
		},
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'cpf is required'
				},
				notEmpty: {
					msg: 'cpf is required'
				},
				len: {
					args: [11, 11],
					msg: 'cpf must be 11 characters long'
				},
				isUnique(value) {
					return User.findOne({ where: { cpf: value } })
						.then((user) => {
							if (user) {
								throw new Error('cpf already exists');
							}
						});
				}
			}
		},
		street: {
			type: DataTypes.STRING(150),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'street is required'
				},
				notEmpty: {
					msg: 'street is required'
				},
				len: {
					args: [0, 150],
					msg: 'street must be less than 150 characters'
				}
			}
		},
		streetNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'street is required'
				},
				isInt: {
					msg: 'streetNumber must be an integer'
				}
			}
		},
		district: {
			type: DataTypes.STRING(150),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'district is required'
				},
				notEmpty: {
					msg: 'district is required'
				},
				len: {
					args: [0, 150],
					msg: 'district must be less than 150 characters'
				}
			}
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: {
					args: [0, 255],
					msg: 'complement must be less than 255 characters'
				}
			}
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'birthDate is required'
				},
				notEmpty: {
					msg: 'birthDate is required'
				},
				isDate: {
					msg: 'birthDate must be a date'
				},
				isBefore: {
					args: [new Date().toISOString().split('T')[0]],
					msg: 'birthDate must be before today'
				}
			}
		},
		phone: {
			type: DataTypes.STRING(14),
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'phone is required'
				},
				notEmpty: {
					msg: 'phone is required'
				},
				len: {
					args: [0, 14],
					msg: 'phone must be less than 14 characters'
				},
				isUnique(value) {
					return User.findOne({ where: { phone: value } })
						.then((user) => {
							if (user) {
								throw new Error('phone already exists');
							}
						});
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'email is required'
				},
				notEmpty: {
					msg: 'email is required'
				},
				len: {
					args: [0, 255],
					msg: 'email must be less than 255 characters'
				},
				isEmail: {
					msg: 'email must be a valid email'
				},
				isUnique(value) {
					return User.findOne({ where:{ email: value } })
						.then((user) => {
							if (user) {
								throw new Error('email already exists');
							}
						});
				}
			}
		},
		idCity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idCity is required'
				},
				isInt: {
					msg: 'idCity must be an integer'
				}
			}
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isInt: {
					msg: 'createdBy must be an integer'
				}
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		updatedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isInt: {
					msg: 'updatedBy must be an integer'
				}
			}
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: 'updatedAt must be a date'
				}
			}
		},
		deletedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isInt: {
					msg: 'deletedBy must be an integer'
				}
			}
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: 'deletedAt must be a date'
				}
			}
		},
		idCompany: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idCompany is required'
				},
				isInt: {
					msg: 'idCompany must be an integer'
				}
			}
		}
	}, {
		hooks: {
			beforeCreate: (user, options) => {
				if (!options.createdBy) {
					throw new ValidationError('createdBy is required');
				}
				user.createdBy = options.createdBy;
				user.createdAt = new Date();
			},
			beforeUpdate: (user, options) => {
				if (!options.updatedBy) {
					throw new ValidationError('updatedBy is required');
				}
				user.updatedBy = options.updatedBy;
				user.updatedAt = new Date();
			},
			beforeDestroy: (user, options) => {
				if (!options.deletedBy) {
					throw new ValidationError('deletedBy is required');
				}
				user.deletedBy = options.createdBy;
			}
		},
		sequelize,
		timestamps: true,
		createdAt: false,
		updatedAt: false,
		paranoid: true,
		modelName: 'user',
		freezeTableName: true
	});

	return User;
};
