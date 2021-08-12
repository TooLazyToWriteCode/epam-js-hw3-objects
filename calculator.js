/**
 * Represents properties of an order, a product, a type of a product or a
 * component of a product. It contains such settings as a price, an energy
 * value, and other.
 */
class Properties {
  /**
   * @param {Object} props        The list of properties.
   * @param {number} props.energy The energy, in calories.
   * @param {number} props.price  The price, in tugriks.
   */
  constructor(props = {}) {
    this._energy = props.energy || 0;
    this._price  = props.price  || 0;
  }

  /** @return {Properties} The properties copy. */
  get copy() {
    return Object.assign({}, this);
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
   * @param  {number}     value The multiplier value.
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
  _props = new Properties();

  /** @return {number} The energy, in calories. */
  get energy() {
    return this._props.energy;
  }

  /** @return {number} The price, in tugriks. */
  get price() {
    return this._props.price;
  }

  /** @return {Properties} The properties copy. */
  get props() {
    return this._props.copy;
  }
}

/** Represents a burger, nothing more to explain here. */
class Burger extends Product {
  /** @type {Error} */
  _FILL_FAIL_ERROR = new Error("the burger fill is not chosen or is invalid");

  /** @type {Error} */
  _SIZE_FAIL_ERROR = new Error("the burger size is not chosen or is invalid");

  /** @const {Properties} The big burger. */
  BIG = new Properties({ energy: 40, price: 100 });

  /** @const {Properties} The small burger. */
  SMALL = new Properties({ energy: 20, price: 50 });

  /** @const {Properties} The burger with cheese. */
  WITH_CHEESE = new Properties({ energy: 20, price: 10 });

  /** @const {Properties} The burger with potato. */
  WITH_POTATO = new Properties({ energy: 10, price: 15 });

  /** @const {Properties} The burger with salad. */
  WITH_SALAD = new Properties({ energy: 5, price: 20 });

  /**
   * @param {string} size The size of a burger, from a set.
   * @param {string} fill The fillfor a burger, from a set.
   */
  constructor(size, fill) {
    super();

    if (size instanceof Properties) {
      this._props.add(this._size = size);
    } else {
      throw this._SIZE_FAIL_ERROR;
    }

    if (fill instanceof Properties) {
      this._props.add(this._fill = fill);
    } else {
      throw this._FILL_FAIL_ERROR;
    }
  }

  /** @return {string} The fill of the burger, from a set. */
  get fill() {
    return this._fill;
  }

  /** @return {string} The size of the burger, from a set. */
  get size() {
    return this._size;
  }
}

/** Represents a drink, such as a cup of coffee or a glass of cola. */
class Drink extends Product {
  /** @type {Error} */
  _TYPE_FAIL_ERROR = new Error("the drink type is not chosen or is invalid");

  /** @const {Properties} The coffee. */
  COFFEE = new Properties({ energy: 20, price: 80 });

  /** @const {Properties} The cola. */
  COLA = new Properties({ energy: 40, price: 50 });

  /** @param {string} type The type of a drink, from a set. */
  constructor(type) {
    super();

    if (type instanceof Properties) {
      this._props.add(this._type = type);
    } else {
      throw this._TYPE_FAIL_ERROR;
    }
  }

  /** @return {string} The type of the drink, from a set. */
  get type() {
    return this._type;
  }
}

/** Represents a salad, such as a Caesar salad or an Olivier salad. */
class Salad extends Product {
  /** @type {Error} */
  _TYPE_FAIL_ERROR = new Error("the salad type is not chosen or is invalid");

  /** @type {string} */
  _WEIGHT_WARN = "the salad weight is not chosen or is invalid, assuming 100g";

  /** @const {Properties} The Caesar salad. */
  CAESAR = new Properties({ energy: 20, price: 100 });

  /** @const {Properties} The Olivier salad. */
  OLIVIER = new Properties({ energy: 80, price: 50 });

  /** @type {number} */
  _weight = 100;

  /**
   * @param {string} type   The type of a salad, from a set.
   * @param {number} weight The weight of a salad, in grams.
   */
  constructor(type, weight) {
    super();

    if (type instanceof Properties) {
      this._props.add(this._type = type);
    } else {
      throw this._TYPE_FAIL_ERROR;
    }

    if (typeof weight === "number") {
      this.weight = weight;
    } else {
      console.warn(this._WEIGHT_WARN);
    }
  }

  /** @return {string} The type of the salad, from a set. */
  get type() {
    return this._type;
  }

  /** @return {number} The weight of a salad, in grams. */
  get weight() {
    return this._weight;
  }

  /** @param {number} weight The weight of a salad, in grams. */
  set weight(weight) {
    // Do not use `_weight` as a setter!
    this._props.multiply(weight / this._weight);
    this._weight = weight;
  }
}

/** Represents the order, containing the order. */
class Order extends Product {
  /** @type {Error} */
  _PAID_FOR_ERROR = new Error("the product is already paid for");

  /** @type {boolean} */
  _isPaidFor = false;

  /** @type {Set<Product>} */
  _prods = new Set();

  /**
   * Adds the product to the order,
   * regardless of whether the order was paid for.
   * @param  {Product} prod The product to add.
   */
  _addUnensured(prod) {
    this._prods.add(prod);
    this._props.add(prod.props);
  }

  /**
   * Deletes the product from the order,
   * regardless of whether the order was paid for.
   * @param  {Product} prod The product to delete.
   */
  _deleteUnensured(prod) {
    this._prods.delete(prod);
    this._props.delete(prod.props);
  }

  /**
   * Pays for the order and makes it immutable,
   * regardless of whether the order was paid for.
   */
  _payForUnensured() {
    this._isPaidFor = true;
  }

  /**
   * Ensures that the order was not paid for yet.
   * @param  {Function} call The callback function.
   * @param  {...any}   args The callback arguments.
   * @return {any}      The result of the callback.
   */
  _ensureNotPaid(call, ...args) {
    if (this._isPaidFor) {
      throw _PAID_FOR_ERROR;
    } else {
      return call(...args);
    }
  }

  /**
   * Adds the product to the order.
   * @param  {Product} prod The product to add.
   * @return {Order}   This instance (for chaining).
   */
  add(prod) {
    this._ensureNotPaid(this._addUnensured);
    return this;
  }

  /**
   * Deletes the product from the order.
   * @param  {Product} prod The product to delete.
   * @return {Order}   This instance (for chaining).
   */
  delete(prod) {
    this._ensureNotPaid(this._deleteUnensured);
    return this;
  }

  /**
   * Pays for the order and makes it immutable.
   * @return {Order} This instance (for chaining).
   */
  payFor() {
    this._ensureNotPaid(this._payForUnensured);
    return this;
  }
}
