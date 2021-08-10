/**
 * Represents common data that a single product holds, such as
 * its price, energy value and other similar characteristics.
 */
class ProductData {
	#energy;
	#price;

	/**
	 * @param {number} energy The energy value, in calories.
	 * @param {number} price The price, in tugriks.
	 */
	constructor(energy, price) {
		this.#energy = energy;
		this.#price = price;
	}
}
