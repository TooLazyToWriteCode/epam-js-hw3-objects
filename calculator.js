/**
 * Represents properties of an order, a product, a type of a product or a
 * component of a product. It contains such settings as a price, an energy
 * value, and other.
 */
class Properties {
  /**
   * @param {Object} props        The list of properties.
   * @param {number} props.energy The energy value, in calories.
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

  /** @return {number} The energy value, in calories. */
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
  /** @const {string} The name which identifies the product. */
  static _NAME = "product";

  /** @const {boolean} Whether the errors have been initialized. */
  static _ERRORS_INITED = false;

  /**
   * @const {Error} The error to throw when no product
   * filling is provided, or the provided filling is not valid.
   */
  static _FILL_FAIL_ERROR;

  /**
   * @const {Error} The error to throw when no product
   * size is provided, or the provided size is not valid.
   */
  static _SIZE_FAIL_ERROR;

  /**
   * @const {Error} The error to throw when no product
   * type is provided, or the provided type is not valid.
   */
  static _TYPE_FAIL_ERROR;

  /** @var {Properties} The properties of the product. */
  _props = new Properties();

  constructor() {
    if (!this.constructor._ERRORS_INITED) {
      this.constructor._FILL_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} filling is not chosen or is invalid`
      );

      this.constructor._SIZE_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} size is not chosen or is invalid`
      );

      this.constructor._TYPE_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} type is not chosen or is invalid`
      );
    } else {
      this.constructor._ERRORS_INITED = true;
    }
  }

  /** @return {number} The energy value, in calories. */
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

  /**
   * Prints the product energy value to the console.
   * @return {Product} This instance (for chaining).
   */
  printEnergy() {
    console.log(
      `Your ${this.constructor._NAME} consists of ${this.energy} calories.`
    );

    return this;
  }

  /**
   * Prints the product information to the console.
   * @return {Product} This instance (for chaining).
   */
  printInfo() {
    this.printPrice();
    this.printEnergy();
    return this;
  }

  /**
   * Prints the product price to the console.
   * @return {Product} This instance (for chaining).
   */
  printPrice() {
    console.log(
      `Your ${this.constructor._NAME} is worth ${this.price} tugriks.`
    );

    return this;
  }
}

/** Represents a burger, nothing more to explain here. */
class Burger extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "burger";

  /** @const {Properties} The big burger. */
  static BIG = new Properties({ energy: 40, price: 100 });

  /** @const {Properties} The small burger. */
  static SMALL = new Properties({ energy: 20, price: 50 });

  /** @const {Properties} The burger with cheese. */
  static WITH_CHEESE = new Properties({ energy: 20, price: 10 });

  /** @const {Properties} The burger with potato. */
  static WITH_POTATO = new Properties({ energy: 10, price: 15 });

  /** @const {Properties} The burger with salad. */
  static WITH_SALAD = new Properties({ energy: 5, price: 20 });

  /**
   * @param {Properties} size The size of a burger, from a set.
   * @param {Properties} fill The fillfor a burger, from a set.
   */
  constructor(size, fill) {
    super();

    if (size instanceof Properties) {
      this._props.add(this._size = size);
    } else {
      throw this.constructor._SIZE_FAIL_ERROR;
    }

    if (fill instanceof Properties) {
      this._props.add(this._fill = fill);
    } else {
      throw this.constructor._FILL_FAIL_ERROR;
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
  /** @const {string} The name which identifies the product. */
  static _NAME = "drink";

  /** @const {Properties} The coffee. */
  static COFFEE = new Properties({ energy: 20, price: 80 });

  /** @const {Properties} The cola. */
  static COLA = new Properties({ energy: 40, price: 50 });

  /** @param {Properties} type The type of a drink, from a set. */
  constructor(type) {
    super();

    if (type instanceof Properties) {
      this._props.add(this._type = type);
    } else {
      throw this.constructor._TYPE_FAIL_ERROR;
    }
  }

  /** @return {string} The type of the drink, from a set. */
  get type() {
    return this._type;
  }
}

/** Represents a salad, such as a Caesar salad or an Olivier salad. */
class Salad extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "salad";

  /** @const {string} The message to output when the weight is not chosen. */
  static _WEIGHT_LOG = "the salad weight is not chosen, assuming 100g";

  /** @const {string} The message to output when the weight is not valid. */
  static _WEIGHT_WARN = "the salad weight is invalid, assuming 100g";

  /** @const {Properties} The Caesar salad. */
  static CAESAR = new Properties({ energy: 20, price: 100 });

  /** @const {Properties} The Olivier salad. */
  static OLIVIER = new Properties({ energy: 80, price: 50 });

  /** @var {number} The weight of the salad. */
  _weight = 100;

  /**
   * @param {Properties} type   The type of a salad, from a set.
   * @param {number}     weight The weight of a salad, in grams.
   */
  constructor(type, weight) {
    super();

    if (type instanceof Properties) {
      this._props.add(this._type = type);
    } else {
      throw this.constructor._TYPE_FAIL_ERROR;
    }

    switch (typeof weight) {
      case "undefined":
        console.log(this.constructor._WEIGHT_LOG);
        break;
      case "number":
        this.weight = weight;
        break;
      default:
        console.warn(this.constructor._WEIGHT_WARN);
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
    // Do not use _weight as a setter elsewhere!
    this._props.multiply(weight / this._weight);
    this._weight = weight;
  }
}

/** Represents the order, containing the order. */
class Order extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "order";

  /**
   * @const {Error} The error to throw when trying
   * to change the order that was already paid for.
   */
  static _PAID_FOR_ERROR = new Error("the product is already paid for");

  /** @var {boolean} Whether the order was paid for. */
  _isPaidFor = false;

  /** @var {Set<Product>} All the products in the order. */
  _prods = new Set();

  /**
   * Adds the product to the order
   * regardless of whether the order was paid for.
   * @param  {Product} prod The product to add.
   */
  _addUnensured(prod) {
    this._prods.add(prod);
    this._props.add(prod.props);
  }

  /**
   * Deletes the product from the order
   * regardless of whether the order was paid for.
   * @param  {Product} prod The product to delete.
   */
  _deleteUnensured(prod) {
    this._prods.delete(prod);
    this._props.delete(prod.props);
  }

  /**
   * Pays for the order and makes it immutable
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
      throw this.constructor._PAID_FOR_ERROR;
    } else {
      return call.call(this, ...args);
    }
  }

  /**
   * Adds the product to the order.
   * @param  {Product} prod The product to add.
   * @return {Order}   This instance (for chaining).
   */
  add(prod) {
    this._ensureNotPaid(this._addUnensured, prod);
    return this;
  }

  /**
   * Deletes the product from the order.
   * @param  {Product} prod The product to delete.
   * @return {Order}   This instance (for chaining).
   */
  delete(prod) {
    this._ensureNotPaid(this._deleteUnensured, prod);
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
