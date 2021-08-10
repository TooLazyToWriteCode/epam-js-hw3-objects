/**
 * Represents common data that a single entry (either a product or a component
 * of a product) holds, such as its price, energy and other similar properties.
 */
class EntryData {
	#energy;
	#price;

	/**
	 * @param {object} data The task data itself.
	 */
	constructor(data = {}) {
		this.#energy = data.energy || 0;
		this.#price  = data.price  || 0;
	}

	/**
	 * @return {number} The energy, in calories.
	 */
	get energy() {
		return this.#energy;
	}

	/**
	 * @return {number} The price, in tugriks.
	 */
	get price() {
		return this.#price;
	}
}

/**
 * Represents entry data that can be edited, thus is dynamic.
 */
class DynamicEntryData extends EntryData {
	/**
	 * Adds the given entry data to the current properties.
	 * @param {EntryData} entryData The data to add.
	 */
	add(entryData) {
		// TODO: Implement this.
	}

	/**
	 * Adds the given entry data from the current properties.
	 * @param {EntryData} entryData The data to remove.
	 */
	remove(entryData) {
		// TODO: Implement this.
	}
}

/**
 * Represents a single sold food product.
 */
class Product {
	#total = new DynamicEntryData();
}

/**
 * Represents a hamburger, nothing more to explain here.
 */
class Burger extends Product {
	static #big   = new EntryData({ energy: 40, price: 100 });
	static #small = new EntryData({ energy: 20, price:  50 });

	static #withCheese = new EntryData({ energy: 20, price: 10 });
	static #withPotato = new EntryData({ energy: 10, price: 15 });
	static #withSalad  = new EntryData({ energy:  5, price: 20 });
}

/**
 * Represents a drink, such as a cup of coffee or a glass of cola.
 */
class Drink extends Product {
	static #coffee = new EntryData({ energy: 20, price: 80 });
	static #cola   = new EntryData({ energy: 40, price: 50 });
}

/**
 * Represents a salad, such as a Caesar or Olivier salad.
 */
class Salad extends Product {
	static #caesar  = new EntryData({ energy: 20, price: 100 });
	static #olivier = new EntryData({ energy: 80, price:  50 });
}
