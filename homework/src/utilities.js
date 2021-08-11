/**
 * Represents common data that a single entry (either a product or a component
 * of a product) holds, such as its price, energy and other similar properties.
 */
class EntryData {
	/**
	 * @param data The task data itself.
	 */
	constructor(data = {}) {
		this._energy = data.energy || 0;
		this._price  = data.price  || 0;
	}

	/**
	 * @return {number} The energy, in calories.
	 */
	get energy() {
		return this._energy;
	}

	/**
	 * @return {number} The price, in tugriks.
	 */
	get price() {
		return this._price;
	}
}

/**
 * Represents entry data that can be edited, thus making it dynamic.
 */
class DynamicEntryData extends EntryData {
	/**
	 * Adds the given entry data to the current properties.
	 * @param {EntryData} entryData The data to add.
	 * @return {DynamicEntryData} The current instance (chaining).
	 */
	add(entryData) {
		for (const key of Object.keys(this)) {
			this[key] += entryData[key];
		}

		return this;
	}

	/**
	 * Adds the given entry data from the current properties.
	 * @param {EntryData} entryData The data to remove.
	 * @return {DynamicEntryData} The current instance (chaining).
	 */
	remove(entryData) {
		for (const key of Object.keys(this)) {
			this[key] -= entryData[key];
		}

		return this;
	}

	mul(entryData) {
		for (const key of Object.keys(this)) {
			this[key] *= entryData;
		}

		return this;
	}
}

/**
 * Represents a single sold food product.
 */
class Product {
    _total = new DynamicEntryData();

    /**
     * @param {string} type The product type.
     */
    constructor(types, type) {
        if (!(type in types)) {
            throw new Error(`Unknown product type: ${type}`);
        }

        this._type = types[type];
        this._typeStr = type;
        this._total.add(this._type);
    }

    /**
     * @return {number} The energy, in calories.
     */
    get energy() {
        return this._total.energy;
    }

    /**
     * @return {number} The price, in tugriks.
     */
    get price() {
        return this._total.price;
    }

    get type() {
        return this._typeStr;
    }
}

/**
 * Represents a hamburger, nothing more to explain here.
 */
class Burger extends Product {
	static _withCheese = new EntryData({ energy: 20, price: 10 });
	static _withPotato = new EntryData({ energy: 10, price: 15 });
	static _withSalad  = new EntryData({ energy:  5, price: 20 });

    /**
     * @param {string} type The hamburger type.
     */
    constructor(type) {
        const _types = {
            big: new EntryData({ energy: 40, price: 100 }),
            small: new EntryData({ energy: 20, price:  50 }),
        };

        super(_types, type);
    }

	/**
	 * Adds cheese to the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	addCheese() {
		this._total.add(this.constructor._withCheese);
		return this;
	}

	/**
	 * Adds potato to the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	addPotato() {
		this._total.add(this.constructor._withPotato);
		return this;
	}

	/**
	 * Adds potato to the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	addSalad() {
		this._total.add(this.constructor._withSalad);
		return this;
	}

	/**
	 * Removes cheese from the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	removeCheese() {
		this._total.remove(this.constructor._withCheese);
		return this;
	}

	/**
	 * Removes potato from the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	removePotato() {
		this._total.remove(this.constructor._withPotato);
		return this;
	}

	/**
	 * Removes potato from the burger ingredients.
	 * @return {Burger} The current instance (chaining).
	 */
	removeSalad() {
		this._total.remove(this.constructor._withSalad);
		return this;
	}
}

/**
 * Represents a drink, such as a cup of coffee or a glass of cola.
 */
class Drink extends Product {
    /**
     * @param {string} type The drink type.
     */
    constructor(type) {
        const _types = {
            coffee: new EntryData({ energy: 20, price: 80 }),
            cola:   new EntryData({ energy: 40, price: 50 }),
        };

        super(_types, type);
    }
}

/**
 * Represents a salad, such as a Caesar or Olivier salad.
 */
class Salad extends Product {


    /**
     * @param {string} type The salad type.
     * @param {number} weight The salad weight, in grams.
     */
    constructor(type, weight) {
        const _types = {
            caesar:  new EntryData({ energy: 20, price: 100 }),
            olivier: new EntryData({ energy: 80, price:  50 }),
        };

        const gramsByDefault = 100;
        const multiplier = weight / gramsByDefault;

        super(_types, type);
        this._total.mul(multiplier);
    }
}
