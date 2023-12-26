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

	static values() {
		return [
			UnitTypeEnum.SUPPLIER,
			UnitTypeEnum.SHIPPING,
			UnitTypeEnum.STOCK
		];
	}

	static parse(value) {
		return UnitTypeEnum.values().find(item => item.value === value);
	}

}

module.exports = UnitTypeEnum;
