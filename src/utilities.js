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
