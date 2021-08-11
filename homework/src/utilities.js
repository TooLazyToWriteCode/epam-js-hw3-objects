/**
 * Represents common data that a single entry (either a product, its type or a
 * component of a product) holds, such as its price, energy and other similar
 * properties.
 */
class EntryData {
    /** @param data The task data itself. */
    constructor(data = {}) {
        this._energy = data.energy || 0;
        this._price  = data.price  || 0;
    }

    /** @return {number} The energy, in calories. */
    get energy() {
        return this._energy;
    }

    /** @return {number} The price, in tugriks. */
    get price() {
        return this._price;
    }

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

/** Represents a single sold food product of any kind. */
class Product {
    static getOrFail(obj, key) {
        if (!(key in obj)) {
            throw new Error(`Unknown product value: ${key}.`);
        }

        return obj[key];
    }

    _data = new EntryData();

    /** @return {number} The energy, in calories. */
    get energy() {
        return this._data.energy;
    }

    /** @return {number} The price, in tugriks. */
    get price() {
        return this._data.price;
    }
}

/** Represents a burger, nothing more to explain here. */
class Burger extends Product {
    /**
     * @param {string} size The size of a burger, from a set.
     * @param {string} filling The filling for a burger.
     */
    constructor(size, filling) {
        super();

        this._filling = filling;
        this._data.add(this.constructor.getOrFail({
            cheese: new EntryData({ energy: 20, price: 10 }),
            potato: new EntryData({ energy: 10, price: 15 }),
            salad:  new EntryData({ energy:  5, price: 20 }),
        }, filling));

        this._size = size;
        this._data.add(this.constructor.getOrFail({
            big:   new EntryData({ energy: 40, price: 100 }),
            small: new EntryData({ energy: 20, price:  50 }),
        }, size));
    }

    /** @return {string} The filling of the burger. */
    get filling() {
        return this._filling;
    }

    /** @return {string} The size of the burger. */
    get size() {
        return this._size;
    }
}

/** Represents a drink, such as a cup of coffee or a glass of cola. */
class Drink extends Product {
    /** @param {string} type The type of a drink, from a set. */
    constructor(type) {
        super();

        this._type = type;
        this._data.add(this.constructor.getOrFail({
            coffee: new EntryData({ energy: 20, price: 80 }),
            cola:   new EntryData({ energy: 40, price: 50 }),
        }, type));
    }

    /** @return {string} The type of the drink. */
    get type() {
        return this._type;
    }
}

/** Represents a salad, such as a Caesar salad or an Olivier salad. */
class Salad extends Product {
    /**
     * @param {string} type The type of a salad, from a set.
     * @param {number} weight The weight of a salad, in grams.
     */
     constructor(type, weight) {
        super();

        this._type = type;
        this._data.add(this.constructor.getOrFail({
            caesar:  new EntryData({ energy: 20, price: 100 }),
            olivier: new EntryData({ energy: 80, price:  50 }),
        }, type));

        const defaultGrams = 100;
        const multiplier = weight / defaultGrams;
        this._data.mul(multiplier);
    }

    /** @return {string} The type of the salad. */
    get type() {
        return this._type;
    }
}
