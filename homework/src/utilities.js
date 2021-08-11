/**
 * Represents properties of an order, a product, a type of a product or a
 * component of a product. It contains such fields as a price, an energy
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
     * Multiplies the current properties by the given value.
     * @param  {number} value The multiplier value.
     * @return {Properties} This instance (for chaining).
     */
    multiply(value) {
        Object.keys(this).forEach((key) => this[key] *= value);
        return this;
    }

    /**
     * Substracts the given properties from the current ones.
     * @param  {Properties} props The properties.
     * @return {Properties} This instance (for chaining).
     */
    substract(props) {
        Object.keys(this).forEach((key) => this[key] -= props[key]);
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
     * Either returns the properties of a burger with
     * such filling from the object or throws an error.
     * @param fillings All the possible fillings.
     * @param {string} filling The given filling.
     * @return The properties of a burger with such filling.
     * @throws The unknown burger filling error.
     */
    static getFillingOrThrow(fillings, filling) {
        if (filling in fillings) {
            return fillings[filling];
        }

        throw new Error(`unknown burger filling: ${filling}`);
    }

    /**
     * Either returns the properties of a burger of
     * such size from the object or throws an error.
     * @param sizes All the possible sizes.
     * @param {string} size The given size.
     * @return The properties of a burger of such size.
     * @throws The unknown burger size error.
     */
    static getSizeOrThrow(sizes, size) {
        if (size in sizes) {
            return sizes[size];
        }

        throw new Error(`unknown burger size: ${size}`);
    }

    /**
     * @param {string} size The size of a burger, from a set.
     * @param {string} filling The filling for a burger.
     */
    constructor(size, filling) {
        super();

        this._filling_ = filling;
        this._props_.add(this.constructor.getFillingOrThrow({
            cheese: new Properties({ energy: 20, price: 10 }),
            potato: new Properties({ energy: 10, price: 15 }),
            salad:  new Properties({ energy:  5, price: 20 }),
        }, filling));

        this._size_ = size;
        this._props_.add(this.constructor.getSizeOrThrow({
            big:   new Properties({ energy: 40, price: 100 }),
            small: new Properties({ energy: 20, price:  50 }),
        }, size));
    }

    /** @return {string} The filling of the burger. */
    get filling() {
        return this._filling_;
    }

    /** @return {string} The size of the burger. */
    get size() {
        return this._size_;
    }
}

/** Represents a drink, such as a cup of coffee or a glass of cola. */
class Drink extends Product {
    /**
     * Either returns the properties of a drink of
     * such type from the object or throws an error.
     * @param types All the possible types.
     * @param {string} type The given type.
     * @return The properties of a drink of such type.
     * @throws The unknown drink type error.
     */
    static getTypeOrThrow(types, type) {
        if (type in types) {
            return types[type];
        }

        throw new Error(`unknown drink type: ${type}`);
    }

    /** @param {string} type The type of a drink, from a set. */
    constructor(type) {
        super();

        this._type_ = type;
        this._props_.add(this.constructor.getTypeOrThrow({
            coffee: new Properties({ energy: 20, price: 80 }),
            cola:   new Properties({ energy: 40, price: 50 }),
        }, type));
    }

    /** @return {string} The type of the drink. */
    get type() {
        return this._type_;
    }
}

/** Represents a salad, such as a Caesar salad or an Olivier salad. */
class Salad extends Product {
    /**
     * Either returns the properties of a salad of
     * such type from the object or throws an error.
     * @param types All the possible types.
     * @param {string} type The given type.
     * @return The properties of a salad of such type.
     * @throws The unknown salad type error.
     */
    static getTypeOrThrow(types, type) {
        if (type in types) {
            return types[type];
        }

        throw new Error(`unknown salad type: ${type}`);
    }

    /**
     * @param {string} type The type of a salad, from a set.
     * @param {number} weight The weight of a salad, in grams.
     */
    constructor(type, weight) {
        super();

        this._type_ = type;
        this._props_.add(this.constructor.getTypeOrThrow({
            caesar:  new Properties({ energy: 20, price: 100 }),
            olivier: new Properties({ energy: 80, price:  50 }),
        }, type));

        const defaultGrams = 100;
        const multiplier = weight / defaultGrams;
        this._props_.multiply(multiplier);
    }

    /** @return {string} The type of the salad. */
    get type() {
        return this._type_;
    }
}

/** Represents the order, containing the order. */
class Order extends Product {
    /** @type {Error} */
    static _paidForError_ = new Error("the product is already paid for");

    /** @type {boolean} */
    _isPaidFor_ = false;

    /** @type {Set<Product>} */
    _products_ = new Set();

    /**
     * Adds the product to the order.
     * @param {Product} product The product to add.
     * @return {Order} This instance (for chaining).
     */
    add(product) {
        if (this._isPaidFor_) {
            throw this.constructor._paidForError_;
        }

        this._products_.add(product);
        this._props_.add(product.props);
        return this;
    }

    /**
     * Deletes the product from the order.
     * @param {Product} product The product to delete.
     * @return {Order} This instance (for chaining).
     */
    delete(product) {
        if (this._isPaidFor_) {
            throw this.constructor._paidForError_;
        }

        this._products_.delete(product);
        this._props_.substract(product.props);
        return this;
    }

    /**
     * Locks the order, making it immutable.
     * @return {Order} This instance (for chaining).
     */
    payFor() {
        this._isPaidFor_ = true;
        return this;
    }
}
