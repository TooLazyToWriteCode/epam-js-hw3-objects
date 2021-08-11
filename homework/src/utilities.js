/**
 * Represents common data that a single entry (either a product type or a
 * component of a product) holds, such as its price, energy and other similar
 * properties.
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
 * Represents product data. The difference is that it can be edited, as
 * product properties can change, unlike component or type properties.
 */
class ProductData extends EntryData {
    /**
     * Adds the given entry data to the current properties.
     * @param {EntryData} entryData The data to add.
     * @return {ProductData} The current instance (chaining).
     */
    add(entryData) {
        for (const key of Object.keys(this)) {
            this[key] += entryData[key];
        }

        return this;
    }

    /**
     * Substracts the given entry data from the current properties.
     * @param {EntryData} entryData The data to substract.
     * @return {ProductData} The current instance (chaining).
     */
    sub(entryData) {
        for (const key of Object.keys(this)) {
            this[key] -= entryData[key];
        }

        return this;
    }

    /**
     * Multiplies the current properties by the given multiplier.
     * @param {number} multiplier The multiplier.
     * @return {ProductData} The current instance (chaining).
     */
    mul(multiplier) {
        for (const key of Object.keys(this)) {
            this[key] *= multiplier;
        }

        return this;
    }
}

/**
 * Represents a single sold food product.
 */
class Product {
    _data = new ProductData();

    /**
     * @param types The possible product types.
     * @param {string} type The product type.
     */
    constructor(types, type) {
        if (!(type in types)) {
            throw new Error(`Unknown product type: ${type}`);
        }

        this._type = type;
        this._data.add(types[type]);
    }

    /**
     * @return {number} The energy, in calories.
     */
    get energy() {
        return this._data.energy;
    }

    /**
     * @return {number} The price, in tugriks.
     */
    get price() {
        return this._data.price;
    }

    /**
     * @return {string} The type of the product.
     */
    get type() {
        return this._type;
    }
}

/**
 * Represents a burger, nothing more to explain here.
 */
class Burger extends Product {
    static _withCheese = new EntryData({ energy: 20, price: 10 });
    static _withPotato = new EntryData({ energy: 10, price: 15 });
    static _withSalad  = new EntryData({ energy:  5, price: 20 });

    /**
     * @param {string} type The burger type.
     */
    constructor(type) {
        super({
            big:   new EntryData({ energy: 40, price: 100 }),
            small: new EntryData({ energy: 20, price:  50 }),
        }, type);
    }

    /**
     * @return {string} The size of the product. In this
     * case it is an alias for the type of the product.
     */
    get size() {
        return this.type;
    }

    /**
     * Adds cheese to the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    addCheese() {
        this._data.add(this.constructor._withCheese);
        return this;
    }

    /**
     * Adds potato to the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    addPotato() {
        this._data.add(this.constructor._withPotato);
        return this;
    }

    /**
     * Adds potato to the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    addSalad() {
        this._data.add(this.constructor._withSalad);
        return this;
    }

    /**
     * Removes cheese from the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    removeCheese() {
        this._data.sub(this.constructor._withCheese);
        return this;
    }

    /**
     * Removes potato from the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    removePotato() {
        this._data.sub(this.constructor._withPotato);
        return this;
    }

    /**
     * Removes potato from the burger ingredients.
     * @return {Burger} The current instance (chaining).
     */
    removeSalad() {
        this._data.sub(this.constructor._withSalad);
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
        super({
            coffee: new EntryData({ energy: 20, price: 80 }),
            cola:   new EntryData({ energy: 40, price: 50 }),
        }, type);
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
        const defaultGrams = 100;

        super({
            caesar:  new EntryData({ energy: 20, price: 100 }),
            olivier: new EntryData({ energy: 80, price:  50 }),
        }, type);

        this._data.mul(weight / defaultGrams);
    }
}
