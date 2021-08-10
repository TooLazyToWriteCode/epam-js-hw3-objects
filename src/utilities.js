/**
 * Represents common data that a single product holds, such
 * as its price, energy and other similar characteristics.
 */
class ProductData {
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

	/** @return {number} */
	get energy() {
		return this.#energy;
	}

	/** @return {number} */
	get price() {
		return this.#price;
	}
}

/**
 * Represents a hamburger, nothing more to explain here.
 */
class Burger {
}

/**
 * Represents a drink, such as a cup of coffee or a glass of cola.
 */
class Drink {
}

/**
 * Represents a salad, such as a Caesar or Olivier salad.
 */
class Salad {
}
