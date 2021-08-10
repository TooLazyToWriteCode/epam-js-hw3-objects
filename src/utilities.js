/**
 * Represents common data that a single entry (either a product or a component
 * of a product) holds, such as its price, energy and other similar properties.
 */
class EntryData {
	#energy;
	#price;

	/**
	 * @param {number} energy The energy, in calories.
	 * @param {number} price The price, in tugriks.
	 */
	constructor(energy, price) {
		this.#energy = energy;
		this.#price = price;
	}

	/** @return {number} The energy, in calories. */
	get energy() {
		return this.#energy;
	}

	/** @return {number} The price, in tugriks. */
	get price() {
		return this.#price;
	}
}

/** Represents a hamburger, nothing more to explain here. */
class Burger {
	static #big = new EntryData(40, 100);
	static #small = new EntryData(20, 50);

	static #withCheese = new EntryData(20, 10);
	static #withSalad = new EntryData(5, 20);
	static #withPotato = new EntryData(10, 15);
}

/** Represents a drink, such as a cup of coffee or a glass of cola. */
class Drink {
	static #coffee = new EntryData(20, 80);
	static #cola = new EntryData(40, 50);
}

/** Represents a salad, such as a Caesar or Olivier salad. */
class Salad {
	static #caesar = new EntryData(20, 100);
	static #olivier = new EntryData(80, 50);
}
