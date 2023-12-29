'use strict';

const { Model, ValidationError } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * Unit Model
	 * @category Models
	 * @extends Model
	 */
	class Unit extends Model {

		static associate(models) {
			
			Unit.belongsTo(models.city, {
				foreignKey: 'idCity'
			});

			Unit.belongsTo(models.unitType, {
				foreignKey: 'idUnitType'
			});

			Unit.belongsTo(models.user, {
				foreignKey: 'createdBy',
				as: 'userCreatedBy'
			});

			Unit.belongsTo(models.user, {
				foreignKey: 'updatedBy',
				as: 'userUpdatedBy'
			});

			Unit.belongsTo(models.user, {
				foreignKey: 'deletedBy',
				as: 'userDeletedBy'
			});

			Unit.belongsTo(models.company, {
				foreignKey: 'idCompany'
			});

		}

	}

	Unit.init({
		idUnit: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		tradingName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Trading name is required'
				},
				notEmpty: {
					msg: 'Trading name is required'
				},
				len: {
					args: [0, 255],
					msg: 'Trading name must be less than 255 characters'
				}
			}
		},
		companyName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Company name is required'
				},
				notEmpty: {
					msg: 'Company name is required'
				},
				len: {
					args: [0, 255],
					msg: 'Company name must be less than 255 characters'
				}
			}
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Phone is required'
				},
				notEmpty: {
					msg: 'Phone is required'
				},
				len: {
					args: [0, 15],
					msg: 'Phone must be less than 15 characters'
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
		zipCode: {
			type: DataTypes.STRING(32),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'zipCode is required'
				},
				notEmpty: {
					msg: 'zipCode is required'
				},
				len: {
					args: [0, 32],
					msg: 'zipCode must be less than 32 characters'
				}
			}
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'email is required'
				},
				notEmpty: {
					msg: 'email is required'
				},
				isEmail: {
					msg: 'email must be a valid email'
				},
				len: {
					args: [0, 255],
					msg: 'email must be less than 255 characters'
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
		idUnitType: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'idUnitType is required'
				},
				isInt: {
					msg: 'idUnitType must be an integer'
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
			allowNull: true,
			validate: {
				isInt: {
					msg: 'idCompany must be an integer'
				}
			}
		}
	}, {
		hooks: {
			beforeCreate: (unit, options) => {

				if (!options.createdBy) {
					throw new ValidationError('createdBy is required');
				}

				if (typeof(options.createdBy) !== 'number') {
					throw new ValidationError('createdBy must be a number');
				}
				
				if(options.createdAt) {
					throw new ValidationError('createdAt is not allowed');
				}

				unit.createdBy = options.createdBy;
				unit.createdAt = new Date();
			},
			beforeUpdate: (unit, options) => {

				if (!options.updatedBy) {
					throw new ValidationError('updatedBy is required');
				}

				if (typeof(options.updatedBy) !== 'number') {
					throw new ValidationError('updatedBy must be a number');
				}

				if(options.updatedAt) {
					throw new ValidationError('updatedAt is not allowed');
				}

				unit.updatedBy = options.updatedBy;
				unit.updatedAt = new Date();
			},
			beforeDestroy: (unit, options) => {

				if (options.force !== true) {

					if (!options.deletedBy) {
						throw new ValidationError('deletedBy is required');
					}
	
					if (typeof(options.deletedBy) !== 'number') {
						throw new ValidationError('deletedBy must be a number');
					}
					
				}
				
				if(options.deletedAt) {
					throw new ValidationError('deletedAt is not allowed');
				}

				unit.deletedBy = options.deletedBy;
			}
		},
		sequelize,
		timestamps: true,
		createdAt: false,
		updatedAt: false,
		paranoid: true,
		modelName: 'unit',
		freezeTableName: true
	});

	return Unit;
};
