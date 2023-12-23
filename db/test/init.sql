-- -----------------------------------------------------
-- Schema icDevTest
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS icDevTest;

USE icDevTest;

-- -----------------------------------------------------
-- Table apiKey
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS apiKey (
  idApiKey INT NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(16) NOT NULL,
  CONSTRAINT apiKey_idApiKey_PK PRIMARY KEY (idApiKey),
  CONSTRAINT apiKey_key_UNIQUE UNIQUE (`key`)
);

-- -----------------------------------------------------
-- Table company
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS company (
  idCompany INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  code VARCHAR(16) NOT NULL,
  idApiKey INT NOT NULL,
  CONSTRAINT company_idCompany_PK PRIMARY KEY (idCompany),
  CONSTRAINT company_apiKey_UNIQUE UNIQUE (idApiKey),
  CONSTRAINT company_code_UNIQUE UNIQUE (code),
  CONSTRAINT company_apiKey_FK
    FOREIGN KEY (idApiKey)
    REFERENCES apiKey (idApiKey)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table country
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS country (
  idCountry INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  isoAlpha2 CHAR(2) NOT NULL,
  isoAlpha3 CHAR(3) NOT NULL,
  CONSTRAINT country_idCountry_PK PRIMARY KEY (idCountry)
);

-- -----------------------------------------------------
-- Table state
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS state (
  idState INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  isoAlpha2 CHAR(2) NOT NULL,
  idCountry INT NOT NULL,
  CONSTRAINT state_idState_PK PRIMARY KEY (idState),
  CONSTRAINT state_country_FK
    FOREIGN KEY (idCountry)
    REFERENCES country (idCountry)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table city
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS city (
  idCity INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  stateAcronym CHAR(2) NOT NULL,
  idState INT NOT NULL,
  CONSTRAINT city_idCity_PK PRIMARY KEY (idCity),
  CONSTRAINT city_state_FK
    FOREIGN KEY (idState)
    REFERENCES state (idState)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  idUser INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  login VARCHAR(30),
  `password` VARCHAR(80),
  cpf CHAR(11) NOT NULL,
  street VARCHAR(150) NOT NULL,
  streetNumber INT NOT NULL,
  district VARCHAR(150) NOT NULL,
  complement VARCHAR(255),
  birthDate DATE NOT NULL,
  phone CHAR(14) NOT NULL,
  email VARCHAR(255) NOT NULL,
  idCity INT NOT NULL,
  createdBy INT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  idCompany INT NOT NULL,
  CONSTRAINT user_idUser_PK PRIMARY KEY (idUser),
  CONSTRAINT user_cpf_UNIQUE UNIQUE (cpf),
  CONSTRAINT user_phone_UNIQUE UNIQUE (phone),
  CONSTRAINT user_email_UNIQUE UNIQUE (email),
  CONSTRAINT user_login_UNIQUE UNIQUE (login),
  CONSTRAINT user_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_company_FK
    FOREIGN KEY (idCompany)
    REFERENCES company (idCompany)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT user_city_FK
    FOREIGN KEY (idCity)
    REFERENCES city (idCity)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table unitType
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS unitType (
  idUnitType INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  CONSTRAINT unitType_idUnitType_PK PRIMARY KEY (idUnitType)
);

-- -----------------------------------------------------
-- Table unit
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS unit (
  idUnit INT NOT NULL AUTO_INCREMENT,
  tradingName VARCHAR(255) NOT NULL,
  companyName VARCHAR(255) NOT NULL,
  cnpj CHAR(14) NOT NULL,
  phone CHAR(14) NOT NULL,
  street VARCHAR(150) NOT NULL,
  streetNumber INT NOT NULL,
  district VARCHAR(150) NOT NULL,
  complement VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  idCity INT NOT NULL,
  idUnitType INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  idCompany INT NULL,
  CONSTRAINT unit_idUnit_PK PRIMARY KEY (idUnit),
  CONSTRAINT unit_cnpj_UNIQUE UNIQUE (cnpj),
  CONSTRAINT unit_company_FK
    FOREIGN KEY (idCompany)
    REFERENCES company (idCompany)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT unit_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_unitType_FK
    FOREIGN KEY (idUnitType)
    REFERENCES unitType (idUnitType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_city_FK
    FOREIGN KEY (idCity)
    REFERENCES city (idCity)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table stockAccountable
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS stockAccountable (
  stockUnit INT NOT NULL,
  idUser INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT stockAccountable_stockUnit_user_PK PRIMARY KEY (stockUnit, idUser),
  CONSTRAINT stockAccountable_stockUnit_FK
    FOREIGN KEY (stockUnit)
    REFERENCES unit (idUnit)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_user_FK
    FOREIGN KEY (idUser)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table category
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS category (
  idCategory INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT category_idCategory_PK PRIMARY KEY (idCategory),
  CONSTRAINT category_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT category_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT category_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table subcategory
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS subcategory (
  idSubcategory INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  idCategory INT NOT NULL,
  CONSTRAINT subcategory_idSubcategory_PK PRIMARY KEY (idSubcategory),
  CONSTRAINT subcategory_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_category_FK
    FOREIGN KEY (idCategory)
    REFERENCES category (idCategory)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table product
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS product (
  idProduct INT NOT NULL AUTO_INCREMENT,
  barCode VARCHAR(13) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  idSubcategory INT NOT NULL,
  supplierUnit INT NOT NULL,
  CONSTRAINT product_idProduct_PK PRIMARY KEY (idProduct),
  CONSTRAINT product_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_subcategory_FK
    FOREIGN KEY (idSubcategory)
    REFERENCES subcategory (idSubcategory)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT product_supplierUnit_FK
    FOREIGN KEY (supplierUnit)
    REFERENCES unit (idUnit)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transactionType
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS transactionType (
  idTransactionType INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  CONSTRAINT transactionType_idTransactionType_PK PRIMARY KEY (idTransactionType)
);

-- -----------------------------------------------------
-- Table delivery
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS delivery (
  idDelivery INT NOT NULL AUTO_INCREMENT,
  street VARCHAR(150) NOT NULL,
  streetNumber INT NOT NULL,
  district VARCHAR(150) NOT NULL,
  complement VARCHAR(255),
  trackingCode VARCHAR(255) NOT NULL,
  expectedDate DATE NOT NULL,
  deliveredDate DATE,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  shippingUnit INT NOT NULL,
  CONSTRAINT delivery_idDelivery_PK PRIMARY KEY (idDelivery),
  CONSTRAINT delivery_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT delivery_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT delivery_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT delivery_shippingUnit_FK
    FOREIGN KEY (shippingUnit)
    REFERENCES unit (idUnit)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transaction
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `transaction` (
  idTransaction INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  idTransactionType INT NOT NULL,
  idDelivery INT NOT NULL,
  idUnit INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT transaction_idTransaction_PK PRIMARY KEY (idTransaction),
  CONSTRAINT transaction_transactionType_FK
    FOREIGN KEY (idTransactionType)
    REFERENCES transactionType (idTransactionType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_delivery_FK
    FOREIGN KEY (idDelivery)
    REFERENCES delivery (idDelivery)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_unit_FK
    FOREIGN KEY (idUnit)
    REFERENCES unit (idUnit)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT transaction_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT transaction_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES `user` (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transactionAccountable
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS transactionAccountable (
  idTransaction INT NOT NULL,
  idUser INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT transactionAccountable_transaction_user_PK PRIMARY KEY (idTransaction, idUser),
  CONSTRAINT transactionAccountable_transaction_FK
    FOREIGN KEY (idTransaction)
    REFERENCES `transaction` (idTransaction)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_user_FK
    FOREIGN KEY (idUser)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES `user` (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table role
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `role` (
  idRole INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  CONSTRAINT role_idRole_PK PRIMARY KEY (idRole)
);

-- -----------------------------------------------------
-- Table permission
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS permission (
  idPermission INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  CONSTRAINT permission_idPermission_PK PRIMARY KEY (idPermission)
);

-- -----------------------------------------------------
-- Table rolePermissions
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS rolePermissions (
  idRole INT NOT NULL,
  idPermission INT NOT NULL,
  CONSTRAINT rolePermissions_role_permission_PK PRIMARY KEY (idRole, idPermission),
  CONSTRAINT rolePermissions_permission_FK
    FOREIGN KEY (idPermission)
    REFERENCES permission (idPermission)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT rolePermissions_role_FK
    FOREIGN KEY (idRole)
    REFERENCES `role` (idRole)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table userRoles
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS userRoles (
  idUser INT NOT NULL,
  idRole INT NOT NULL,
  CONSTRAINT userRoles_user_role_PK PRIMARY KEY (idUser, idRole),
  CONSTRAINT userRoles_user_FK
    FOREIGN KEY (idUser)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT userRoles_role_FK
    FOREIGN KEY (idRole)
    REFERENCES `role` (idRole)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transactionProducts
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS transactionProducts (
  idTransaction INT NOT NULL,
  idProduct INT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT transactionProducts_transaction_product_PK PRIMARY KEY (idTransaction, idProduct),
  CONSTRAINT transactionProducts_product_FK
    FOREIGN KEY (idProduct)
    REFERENCES product (idProduct)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionProducts_transaction_FK
    FOREIGN KEY (idTransaction)
    REFERENCES `transaction` (idTransaction)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Bulk Insert
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table country
-- -----------------------------------------------------

INSERT INTO country (`name`, isoAlpha2, isoAlpha3) 
  VALUES ('Test Country', 'TC', 'TCT');

-- -----------------------------------------------------
-- Table state
-- -----------------------------------------------------

INSERT INTO `state` (`name`, isoAlpha2, idCountry) 
  VALUES ('Test State', 'TS', 1);

-- -----------------------------------------------------
-- Table city
-- -----------------------------------------------------

INSERT INTO city (`name`, stateAcronym, idState) 
  VALUES ('Test City', 'TS', 1),
  ('Test City 2', 'TS', 1),
  ('Test City 3', 'TS', 1),
  ('Test City 4', 'TS', 1),
  ('Test City 5', 'TS', 1),
  ('Test City 6', 'TS', 1),
  ('Test City 7', 'TS', 1),
  ('Test City 8', 'TS', 1),
  ('Test City 9', 'TS', 1),
  ('Test City 10', 'TS', 1),
  ('Test City 11', 'TS', 1),
  ('Test City 12', 'TS', 1),
  ('Test City 13', 'TS', 1),
  ('Test City 14', 'TS', 1),
  ('Test City 15', 'TS', 1),
  ('Test City 16', 'TS', 1),
  ('Test City 17', 'TS', 1),
  ('Test City 18', 'TS', 1),
  ('Test City 19', 'TS', 1),
  ('Test City 20', 'TS', 1),
  ('Test City 21', 'TS', 1),
  ('Test City 22', 'TS', 1),
  ('Test City 23', 'TS', 1),
  ('Test City 24', 'TS', 1),
  ('Test City 25', 'TS', 1),
  ('Test City 26', 'TS', 1),
  ('Test City 27', 'TS', 1),
  ('Test City 28', 'TS', 1),
  ('Test City 29', 'TS', 1),
  ('Test City 30', 'TS', 1),
  ('Test City 31', 'TS', 1),
  ('Test City 32', 'TS', 1),
  ('Test City 33', 'TS', 1),
  ('Test City 34', 'TS', 1),
  ('Test City 35', 'TS', 1),
  ('Test City 36', 'TS', 1),
  ('Test City 37', 'TS', 1),
  ('Test City 38', 'TS', 1),
  ('Test City 39', 'TS', 1),
  ('Test City 40', 'TS', 1),
  ('Test City 41', 'TS', 1),
  ('Test City 42', 'TS', 1),
  ('Test City 43', 'TS', 1),
  ('Test City 44', 'TS', 1),
  ('Test City 45', 'TS', 1),
  ('Test City 46', 'TS', 1),
  ('Test City 47', 'TS', 1),
  ('Test City 48', 'TS', 1),
  ('Test City 49', 'TS', 1),
  ('Test City 50', 'TS', 1),
  ('Test City 51', 'TS', 1),
  ('Test City 52', 'TS', 1),
  ('Test City 53', 'TS', 1),
  ('Test City 54', 'TS', 1),
  ('Test City 55', 'TS', 1),
  ('Test City 56', 'TS', 1),
  ('Test City 57', 'TS', 1),
  ('Test City 58', 'TS', 1),
  ('Test City 59', 'TS', 1),
  ('Test City 60', 'TS', 1),
  ('Test City 61', 'TS', 1),
  ('Test City 62', 'TS', 1),
  ('Test City 63', 'TS', 1),
  ('Test City 64', 'TS', 1),
  ('Test City 65', 'TS', 1),
  ('Test City 66', 'TS', 1),
  ('Test City 67', 'TS', 1),
  ('Test City 68', 'TS', 1),
  ('Test City 69', 'TS', 1),
  ('Test City 70', 'TS', 1),
  ('Test City 71', 'TS', 1),
  ('Test City 72', 'TS', 1),
  ('Test City 73', 'TS', 1),
  ('Test City 74', 'TS', 1),
  ('Test City 75', 'TS', 1),
  ('Test City 76', 'TS', 1),
  ('Test City 77', 'TS', 1),
  ('Test City 78', 'TS', 1),
  ('Test City 79', 'TS', 1),
  ('Test City 80', 'TS', 1),
  ('Test City 81', 'TS', 1),
  ('Test City 82', 'TS', 1),
  ('Test City 83', 'TS', 1),
  ('Test City 84', 'TS', 1),
  ('Test City 85', 'TS', 1),
  ('Test City 86', 'TS', 1),
  ('Test City 87', 'TS', 1),
  ('Test City 88', 'TS', 1),
  ('Test City 89', 'TS', 1),
  ('Test City 90', 'TS', 1),
  ('Test City 91', 'TS', 1),
  ('Test City 92', 'TS', 1),
  ('Test City 93', 'TS', 1),
  ('Test City 94', 'TS', 1),
  ('Test City 95', 'TS', 1),
  ('Test City 96', 'TS', 1),
  ('Test City 97', 'TS', 1),
  ('Test City 98', 'TS', 1),
  ('Test City 99', 'TS', 1),
  ('Test City 100', 'TS', 1);

-- -----------------------------------------------------
-- Table apiKey
-- -----------------------------------------------------

INSERT INTO apiKey (`key`) VALUES ('1111111111111111');

-- -----------------------------------------------------
-- Table company
-- -----------------------------------------------------

INSERT INTO company (`name`, code, idApiKey) VALUES ('Test Company', '1111111111111111', 1);

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------

-- Password = 123

INSERT INTO user (`name`, lastName, `login`, `password`, cpf, street, streetNumber, district, birthDate, phone, email, idCity, createdBy, idCompany) 
  VALUES ('Test', 'Pengu', 'pengu.master', '$2a$10$LMrG2zc49pr0pLa7AOm5SeJgSxphKIaO/oxvXAK5mrwKPvjFWppiy', '11111111111', 'Test Street', 777, 'Test District', '1995-12-04', '11111111111', 'testPengu@test.com', 1, 1, 1);

-- -----------------------------------------------------
-- Table role
-- -----------------------------------------------------

INSERT INTO role (`name`, `description`) VALUES ('Master', 'Master user, has full permission');

-- -----------------------------------------------------
-- Table permission
-- -----------------------------------------------------

INSERT INTO permission (`name`, `description`) VALUES ('Master', 'Full permission');
INSERT INTO permission (`name`, `description`) VALUES ('Create', 'Create permission');
INSERT INTO permission (`name`, `description`) VALUES ('Read', 'Read permission');
INSERT INTO permission (`name`, `description`) VALUES ('Update', 'Update permission');
INSERT INTO permission (`name`, `description`) VALUES ('Delete', 'Delete');

-- -----------------------------------------------------
-- Table rolePermissions
-- -----------------------------------------------------

INSERT INTO rolePermissions (idRole, idPermission) VALUES (1, 1);

-- -----------------------------------------------------
-- Table userRoles
-- -----------------------------------------------------

INSERT INTO userRoles (idUser, idRole) VALUES (1, 1);

-- -----------------------------------------------------
-- Table unitType
-- -----------------------------------------------------

INSERT INTO unitType (`name`) VALUES ('Supplier'), ('Shipping'), ('Stock');

-- -----------------------------------------------------
-- Table transactionType
-- -----------------------------------------------------

INSERT INTO transactionType (`name`) VALUES ('Input'), ('Output');