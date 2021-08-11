/**
 * Represents properties of an order, a product, a type of a product or a
 * component of a product. It contains such settings as a price, an energy
 * value, and other.
 */
class Properties {
    /** @param props The properties themselves. */
    constructor(props = {}) {
        this._energy_ = props.energy || 0;
        this._price_  = props.price  || 0;
    }

    /** @return {Properties} The properties copy. */
    get copy() {
        return Object.assign({}, this);
    }

    /** @return {number} The energy, in calories. */
    get energy() {
        return this._energy_;
    }

    /** @return {number} The price, in tugriks. */
    get price() {
        return this._price_;
    }

    /**
     * Adds the given properties to the current ones.
     * @param  {Properties} props The properties.
     * @return {Properties} This instance (for chaining).
     */
    add(props) {
        Object.keys(this).forEach((key) => this[key] += props[key]);
        return this;
    }

    /**
     * Deletes the given properties from the current ones.
     * @param  {Properties} props The properties.
     * @return {Properties} This instance (for chaining).
     */
    delete(props) {
        Object.keys(this).forEach((key) => this[key] -= props[key]);
        return this;
    }

    /**
     * Multiplies the current properties by the given value.
     * @param  {number} value The multiplier value.
     * @return {Properties} This instance (for chaining).
     */
    multiply(value) {
        Object.keys(this).forEach((key) => this[key] *= value);
        return this;
    }
}

/** Represents a single sold food product of any kind. */
class Product {
    /** @type {Properties} */
    _props_ = new Properties();

    /** @return {number} The energy, in calories. */
    get energy() {
        return this._props_.energy;
    }

    /** @return {number} The price, in tugriks. */
    get price() {
        return this._props_.price;
    }

    /** @return {Properties} The properties copy. */
    get props() {
        return this._props_.copy;
    }
}

/** Represents a burger, nothing more to explain here. */
class Burger extends Product {
    /**
     * @param {string} size    The size of a burger,     from a set.
     * @param {string} filling The filling for a burger, from a set.
     */
    constructor(size, filling) {
        super();

        this._props_.add({
            cheese: new Properties({ energy: 20, price: 10 }),
            potato: new Properties({ energy: 10, price: 15 }),
            salad:  new Properties({ energy:  5, price: 20 }),
        }[this._filling_ = filling]);

        this._props_.add({
            big:   new Properties({ energy: 40, price: 100 }),
            small: new Properties({ energy: 20, price:  50 }),
        }[this._size_ = size]);
    }

    /** @return {string} The filling of the burger, from a set. */
    get filling() {
        return this._filling_;
    }

    /** @return {string} The size of the burger, from a set. */
    get size() {
        return this._size_;
    }
}

/** Represents a drink, such as a cup of coffee or a glass of cola. */
class Drink extends Product {
    /** @param {string} type The type of a drink, from a set. */
    constructor(type) {
        super();

        this._props_.add({
            coffee: new Properties({ energy: 20, price: 80 }),
            cola:   new Properties({ energy: 40, price: 50 }),
        }[this._type_ = type]);
    }

    /** @return {string} The type of the drink, from a set. */
    get type() {
        return this._type_;
    }
}

/** Represents a salad, such as a Caesar salad or an Olivier salad. */
class Salad extends Product {
    /** @type {number} */
    _weight_ = 100;

    /**
     * @param {string} type   The type of a salad, from a set.
     * @param {number} weight The weight of a salad, in grams.
     */
    constructor(type, weight) {
        super();

        this._props_.add({
            caesar:  new Properties({ energy: 20, price: 100 }),
            olivier: new Properties({ energy: 80, price:  50 }),
        }[this._type_ = type]);
        this.weight = weight;
    }

    /** @return {string} The type of the salad, from a set. */
    get type() {
        return this._type_;
    }

    /** @return {number} The weight of a salad, in grams. */
    get weight() {
        return this._weight_;
    }

    /** @param {number} weight The weight of a salad, in grams. */
    set weight(weight) {
        // Do not use `_weight_` as a setter!
        this._props_.multiply(weight / this._weight_);
        this._weight_ = weight;
    }
}

/** Represents the order, containing the order. */
class Order extends Product {
    /** @type {boolean} */
    _isPaidFor_ = false;

    /** @type {Set<Product>} */
    _prods_ = new Set();

    /**
     * Ensures that the order was not paid for yet.
     * @param {Function} callback The callback.
     * @param {...any}   args     The callback args.
     * @return The return value of the callback.
     */
    _ensureNotPaid_(callback, ...args) {
        if (this._isPaidFor_) {
            throw new Error("the product is already paid for");
        } else {
            return callback(...args);
        }
    }

    /**
     * Adds the product to the order.
     * @param {Product} prod The product to add.
     * @return {Order} This instance (for chaining).
     */
    add(prod) {
        return this._ensureNotPaid_(() => {
            this._prods_.add(prod);
            this._props_.add(prod.props);
            return this;
        });
    }

    /**
     * Deletes the product from the order.
     * @param {Product} prod The product to delete.
     * @return {Order} This instance (for chaining).
     */
    delete(prod) {
        return this._ensureNotPaid_(() => {
            this._prods_.delete(prod);
            this._props_.delete(prod.props);
            return this;
        });
    }

    /**
     * Pays for the order and makes it immutable.
     * @return {Order} This instance (for chaining).
     */
    payFor() {
        this._ensureNotPaid_(() => this._isPaidFor_ = true);
        return this;
    }
}
