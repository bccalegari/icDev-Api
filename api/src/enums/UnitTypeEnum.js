class UnitTypeEnum {

	static SUPPLIER = new UnitTypeEnum('Supplier');
	static SHIPPING = new UnitTypeEnum('Shipping');
	static STOCK = new UnitTypeEnum('Stock');

	constructor(value) {
		this.value = value;
	}

	toString() {
		return this.value;
	}
}

module.exports = UnitTypeEnum;
