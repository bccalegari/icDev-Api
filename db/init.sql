-- -----------------------------------------------------
-- Schema icDev
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS icDev;

USE icDev;

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
  apiKey INT NOT NULL,
  CONSTRAINT company_idCompany_PK PRIMARY KEY (idCompany),
  CONSTRAINT company_apiKey_UNIQUE UNIQUE (apiKey),
  CONSTRAINT company_apiKey_FK
    FOREIGN KEY (apiKey)
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
  country INT NOT NULL,
  CONSTRAINT state_idState_PK PRIMARY KEY (idState),
  CONSTRAINT state_country_FK
    FOREIGN KEY (country)
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
  state INT NOT NULL,
  CONSTRAINT city_idCity_PK PRIMARY KEY (idCity),
  CONSTRAINT city_state_FK
    FOREIGN KEY (state)
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
  login VARCHAR(30) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  salt VARCHAR(32) NOT NULL,
  cpf CHAR(11) NOT NULL,
  street VARCHAR(150) NOT NULL,
  streetNumber INT NOT NULL,
  district VARCHAR(150) NOT NULL,
  complement VARCHAR(255),
  birthDate DATE NOT NULL,
  phone CHAR(14) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  company INT NOT NULL,
  CONSTRAINT user_idUser_PK PRIMARY KEY (idUser),
  CONSTRAINT user_cpf_UNIQUE UNIQUE (cpf),
  CONSTRAINT user_phone_UNIQUE UNIQUE (phone),
  CONSTRAINT user_email_UNIQUE UNIQUE (email),
  CONSTRAINT user_login_UNIQUE UNIQUE (login),
  CONSTRAINT user_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_company_FK
    FOREIGN KEY (company)
    REFERENCES company (idCompany)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT user_city_FK
    FOREIGN KEY (city)
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
  city INT NOT NULL,
  unitType INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  company INT NULL,
  CONSTRAINT unit_idUnit_PK PRIMARY KEY (idUnit),
  CONSTRAINT unit_cnpj_UNIQUE UNIQUE (cnpj),
  CONSTRAINT unit_company_FK
    FOREIGN KEY (company)
    REFERENCES company (idCompany)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT unit_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_unitType_FK
    FOREIGN KEY (unitType)
    REFERENCES unitType (idUnitType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT unit_city_FK
    FOREIGN KEY (city)
    REFERENCES city (idCity)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table stockAccountable
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS stockAccountable (
  stockUnit INT NOT NULL,
  `user` INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT stockAccountable_stockUnit_user_PK PRIMARY KEY (stockUnit, `user`),
  CONSTRAINT stockAccountable_stockUnit_FK
    FOREIGN KEY (stockUnit)
    REFERENCES unit (idUnit)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_user_FK
    FOREIGN KEY (`user`)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT stockAccountable_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES user (idUser)
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
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT category_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT category_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES user (idUser)
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
  category INT NOT NULL,
  CONSTRAINT subcategory_idSubcategory_PK PRIMARY KEY (idSubcategory),
  CONSTRAINT subcategory_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT subcategory_category_FK
    FOREIGN KEY (category)
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
  subcategory INT NOT NULL,
  supplierUnit INT NOT NULL,
  CONSTRAINT product_idProduct_PK PRIMARY KEY (idProduct),
  CONSTRAINT product_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT product_subcategory_FK
    FOREIGN KEY (subcategory)
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
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT delivery_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT delivery_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES user (idUser)
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
  transactionType INT NOT NULL,
  delivery INT NOT NULL,
  unit INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT transaction_idTransaction_PK PRIMARY KEY (idTransaction),
  CONSTRAINT transaction_transactionType_FK
    FOREIGN KEY (transactionType)
    REFERENCES transactionType (idTransactionType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_delivery_FK
    FOREIGN KEY (delivery)
    REFERENCES delivery (idDelivery)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_unit_FK
    FOREIGN KEY (unit)
    REFERENCES unit (idUnit)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transaction_createdBy_FK
	FOREIGN KEY (createdBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT transaction_updatedBy_FK
	FOREIGN KEY (updatedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
  CONSTRAINT transaction_deletedBy_FK
	FOREIGN KEY (deletedBy)
	REFERENCES user (idUser)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transactionAccountable
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS transactionAccountable (
  `transaction` INT NOT NULL,
  `user` INT NOT NULL,
  createdBy INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy INT,
  updatedAt DATETIME,
  deletedBy INT,
  deletedAt DATETIME,
  CONSTRAINT transactionAccountable_transaction_user_PK PRIMARY KEY (`transaction`, `user`),
  CONSTRAINT transactionAccountable_transaction_FK
    FOREIGN KEY (`transaction`)
    REFERENCES `transaction` (idTransaction)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_user_FK
    FOREIGN KEY (`user`)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_createdBy_FK
    FOREIGN KEY (createdBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_updatedBy_FK
    FOREIGN KEY (updatedBy)
    REFERENCES user (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT transactionAccountable_deletedBy_FK
    FOREIGN KEY (deletedBy)
    REFERENCES user (idUser)
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
  `role` INT NOT NULL,
  permission INT NOT NULL,
  CONSTRAINT rolePermissions_role_permission_PK PRIMARY KEY (`role`, permission),
  CONSTRAINT rolePermissions_permission_FK
    FOREIGN KEY (permission)
    REFERENCES permission (idPermission)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT rolePermissions_role_FK
    FOREIGN KEY (`role`)
    REFERENCES `role` (idRole)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table userRoles
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS userRoles (
  `user` INT NOT NULL,
  `role` INT NOT NULL,
  CONSTRAINT userRoles_user_role_PK PRIMARY KEY (`user`, `role`),
  CONSTRAINT userRoles_user_FK
    FOREIGN KEY (`user`)
    REFERENCES `user` (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT userRoles_role_FK
    FOREIGN KEY (`role`)
    REFERENCES `role` (idRole)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table transactionProducts
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS transactionProducts (
  `transaction` INT NOT NULL,
  product INT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT transactionProducts_transaction_product_PK PRIMARY KEY (`transaction`, product),
  CONSTRAINT transactionProducts_product_FK
    FOREIGN KEY (product)
    REFERENCES product (idProduct)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT transactionProducts_transaction_FK
    FOREIGN KEY (`transaction`)
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
  VALUES ('Brazil', 'BR', 'BRA'), 
  ('United States of America', 'US', 'USA');

-- -----------------------------------------------------
-- Table state
-- -----------------------------------------------------

LOAD DATA INFILE '../mysql-files/data/states.csv' INTO TABLE `state`
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

-- -----------------------------------------------------
-- Table city
-- -----------------------------------------------------

LOAD DATA INFILE '../mysql-files/data/cities.csv' INTO TABLE city
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;
