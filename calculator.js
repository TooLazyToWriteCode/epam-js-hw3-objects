/**
 * Represents properties of an order, a product, a type of a product or a
 * component of a product. It contains such settings as a price, an energy
 * value, and other. It is intended to be used by other classes, and is
 * pretty useless otherwise.
 */
class Properties {
  /** @const {number} The precision of the floating point values. */
  static _FLOAT_PRECISION = 8;

  /**
   * @param {Object} props        The list of properties.
   * @param {number} props.energy The energy value, in calories.
   * @param {string} props.id     The unique identificator
   * @param {number} props.price  The price, in tugriks.
   */
  constructor(props = {}) {
    this._energy = props.energy || 0;
    this._id     = props.id     || "";
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

  /** @return {string} The unique identificator. */
  get id() {
    return this._id;
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
    Object.keys(this).forEach((key) => {
      if (key !== "_id") {
        this[key] = Number((this[key] + props[key])
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }

  /**
   * Substracts the given properties from the current ones.
   * @param  {Properties} props The properties.
   * @return {Properties} This instance (for chaining).
   */
  sub(props) {
    Object.keys(this).forEach((key) => {
      if (key !== "_id") {
        this[key] = Number((this[key] - props[key])
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }

  /**
   * Multiplies the current properties by the given value.
   * @param  {number}     value The multiplier value.
   * @return {Properties} This instance (for chaining).
   */
  mul(value) {
    Object.keys(this).forEach((key) => {
      if (key !== "_id") {
        this[key] = Number((this[key] * value)
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }
}

/**
 * Represents a single sold food product of any kind. It is intended to be
 * used by other classes, and is pretty useless otherwise.
 */
class Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "product";

  /** @const {boolean} Whether the errors have been initialized. */
  static _ERRORS_INITED = false;

  /**
   * @const {Error} The error to throw when no product
   * filling is provided, or the provided filling is not valid.
   */
  static _FILLING_FAIL_ERROR;

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
      this.constructor._FILLING_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} filling is not chosen or is unknown`
      );

      this.constructor._SIZE_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} size is not chosen or is unknown`
      );

      this.constructor._TYPE_FAIL_ERROR = new Error(
        `the ${this.constructor._NAME} type is not chosen or is unknown`
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

  /** @return {string} The type of the product, from a set. */
  get type() {
    return this._type instanceof Properties ? this._type.id : "product";
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

/**
 * Represents a burger, nothing more to explain here.
 * ```js
 * // A big burger with cheese.
 * const burger1 = new Burger(Burger.BIG, Burger.WITH_CHEESE);
 * // A small burger with potato.
 * const burger2 = new Burger(Burger.SMALL, Burger.WITH_POTATO);
 * // A small burger with salad.
 * const burger3 = new Burger(Burger.SMALL, Burger.WITH_SALAD);
 * // Error, unknown burger size provided.
 * const burger4 = new Burger('average');
 * // Error, no burger size provided.
 * const burger5 = new Burger();
 * // Error, unknown burger filling provided.
 * const burger6 = new Burger(Burger.SMALL, 'fish');
 * // Error, no burger filling provided.
 * const burger7 = new Burger(Burger.SMALL);
 * // Get the burger energy value.
 * console.log(burger1.energy); // 60
 * // Get the burger price.
 * console.log(burger1.price); // 110
 * // Get the burger size.
 * console.log(burger1.size); // "big"
 * // Get the burger filling.
 * console.log(burger1.filling); // "cheese"
 * ```
 */
class Burger extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "burger";

  /** @const {Properties} The big burger. */
  static BIG = new Properties({ id: "big", energy: 40, price: 100 });

  /** @const {Properties} The small burger. */
  static SMALL = new Properties({ id: "small", energy: 20, price: 50 });

  /** @const {Properties} The burger with cheese. */
  static WITH_CHEESE =
    new Properties({ id: "cheese", energy: 20, price: 10 });

  /** @const {Properties} The burger with potato. */
  static WITH_POTATO =
    new Properties({ id: "potato", energy: 10, price: 15 });

  /** @const {Properties} The burger with salad. */
  static WITH_SALAD =
    new Properties({ id: "salad", energy: 5, price: 20 });

  /**
   * @param {Properties} size The size of a burger, from a set.
   * @param {Properties} filling The filling of a burger, from a set.
   * @throws If the properties are not set or are unknown.
   */
  constructor(size, filling) {
    super();

    if (size instanceof Properties) {
      this._props.add(this._size = size);
    } else {
      throw this.constructor._SIZE_FAIL_ERROR;
    }

    if (filling instanceof Properties) {
      this._props.add(this._filling = filling);
    } else {
      throw this.constructor._FILLING_FAIL_ERROR;
    }
  }

  /** @return {string} The filling of the burger, from a set. */
  get filling() {
    return this._filling.id;
  }

  /** @return {string} The size of the burger, from a set. */
  get size() {
    return this._size.id;
  }

  /** @return {string} The type of the burger, it is just burger. */
  get type() {
    return "burger";
  }
}

/**
 * Represents a drink, such as a cup of coffee or a glass of cola.
 * ```js
 * // A cup of coffee.
 * const drink1 = new Drink(Drink.COFFEE);
 * // A glass of cola.
 * const drink2 = new Drink(Drink.COLA);
 * // Error, unknown drink provided.
 * const drink3 = new Drink('tea');
 * // Error, no drink provided.
 * const drink4 = new Drink();
 * // Get the drink energy value.
 * console.log(drink1.energy); // 20
 * // Get the drink price.
 * console.log(drink1.price); // 80
 * // Get the drink type.
 * console.log(drink1.type); // "coffee"
 * ```
 */
class Drink extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "drink";

  /** @const {Properties} The coffee. */
  static COFFEE = new Properties({ id: "coffee", energy: 20, price: 80 });

  /** @const {Properties} The cola. */
  static COLA = new Properties({ id: "cola", energy: 40, price: 50 });

  /**
   * @param {Properties} type The type of a drink, from a set.
   * @throws If the type is not set or is unknown.
   */
  constructor(type) {
    super();

    if (type instanceof Properties) {
      this._props.add(this._type = type);
    } else {
      throw this.constructor._TYPE_FAIL_ERROR;
    }
  }
}

/**
 * Represents a salad, such as a Caesar salad or an Olivier salad.
 * ```js
 * // A Caesar salad, 100 grams.
 * const salad1 = new Salad(Salad.CAESAR);
 * // A Caesar salad, 156 grams.
 * const salad2 = new Salad(Salad.CAESAR, 156);
 * // An Olivier salad, 240 grams.
 * const salad3 = new Salad(Salad.OLIVIER, 240);
 * // Invalid salad weight provided: assume 100 grams.
 * const salad4 = new Salad(Salad.OLIVIER, -3);
 * // Error, unknown salad provided.
 * const salad5 = new Salad('crab');
 * // Error, no salad provided.
 * const salad6 = new Salad();
 * // Get the salad energy value.
 * console.log(salad1.energy); // 20
 * // Get the salad price.
 * console.log(salad1.price); // 100
 * // Get the salad type.
 * console.log(salad1.type); // "caesar"
 * // Get the salad weight.
 * console.log(salad1.weight); // 100
 * // Update the salad weight.
 * salad1.weight = 128;
 * console.log(salad1.weight); // 128
 * ```
 */
class Salad extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "salad";

  /** @const {string} The message to output when the weight is not chosen. */
  static _WEIGHT_LOG = "the salad weight is not chosen, assuming 100g";

  /** @const {string} The message to output when the weight is not valid. */
  static _WEIGHT_WARN = "the salad weight is invalid, assuming 100g";

  /** @const {Properties} The Caesar salad. */
  static CAESAR = new Properties({ id: "caesar", energy: 20, price: 100 });

  /** @const {Properties} The Olivier salad. */
  static OLIVIER = new Properties({ id: "olivier", energy: 80, price: 50 });

  /** @var {number} The weight of the salad. */
  _weight = 100;

  /**
   * @param {Properties} type   The type of a salad, from a set.
   * @param {number}     weight The weight of a salad, in grams.
   * @throws If the type is not set or is unknown.
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
        if (weight >= 0) {
          this.weight = weight;
          break;
        }
      default:
        console.warn(this.constructor._WEIGHT_WARN);
    }
  }

  /** @return {number} The weight of a salad, in grams. */
  get weight() {
    return this._weight;
  }

  /** @param {number} weight The weight of a salad, in grams. */
  set weight(weight) {
    // Do not use _weight as a setter elsewhere!
    this._props.mul(weight / this._weight);
    this._weight = weight;
  }
}

/**
 * Represents the order, containing the order. Supports chaining.
 * ```js
 * // A random salad.
 * const salad = new Salad(Salad.CAESAR, 54);
 * // A random drink.
 * const drink = new Drink(Drink.COFFEE);
 * // The following can also be done separately.
 * // The price and energy properties are available,
 * // but they obviously do not support chaining.
 * // E is the energy value, P is the price.
 * new Order()
 *   // Add the salad.                     [+10.8E,  +54.0P]
 *   .add(salad)
 *   // Add the burger.                    [+30.0E,  +65.0P]
 *   .add(new Burger(Burger.SMALL, Burger.WITH_POTATO))
 *   // Add the cola.                      [+40.0E,  +50.0P]
 *   .add(new Drink(Drink.COLA))
 *   // Add the drink.                     [+20.0E,  +80.0P]
 *   .add(drink)
 *   // Add a big burger with cheese.      [+60.0E, +110.0P]
 *   .add(new Burger(Burger.BIG, Burger.WITH_CHEESE))
 *   // Add the coffee.                    [+20.0E,  +80.0P]
 *   .add(new Drink(Drink.COFFEE))
 *   // Delete the cola by its reference.  [-20.0E,  -80.0P]
 *   .deleteByRef(drink)
 *   // List the ordered products. The big burger is still here.
 *   .printList()
 *   // Delete the coffee by its index.    [-60.0E, -110.0P]
 *   .deleteByIndex(4)
 *   // List the ordered products again. The big burger is gone.
 *   .printList()
 *   // Add the salad.                     [+17.2E,  +86.0P]
 *   .add(new Salad(Salad.CAESAR, 86))
 *   // Outputs the energy value of 118.
 *   .printEnergy()
 *   // Outputs the price of 335.
 *   .printPrice()
 *   // Delete the salad by its reference. [-10.8E,  -54.0P]
 *   .deleteByRef(salad)
 *   // Pay for the order and lock it.
 *   .payFor()
 *   // List the ordered products.
 *   .printList()
 *   // Outputs the price of 281.
 *   .printPrice()
 *   // Outputs the energy value of 107.2.
 *   .printEnergy()
 *   // Outputs the price of 281.
 *   // Outputs the energy value of 107.2.
 *   .printInfo()
 *   // Error, the order is paid for.
 *   .add(new Drink(Drink.COLA));
 * ```
 */
class Order extends Product {
  /** @const {string} The name which identifies the product. */
  static _NAME = "order";

  /** @const {string} The message to output when the product is not found. */
  static _DELETE_LOG = "the product is not found, doing nothing";

  /**
   * @const {Error} The error to throw when trying
   * to change the order that was already paid for.
   */
  static _PAID_FOR_ERROR = new Error("the product is already paid for");

  /** @var {boolean} Whether the order was paid for. */
  _isPaidFor = false;

  /** @var {Product[]} All the products in the order. */
  _prods = [];

  /**
   * Ensures that the order was not paid for yet.
   * @throws If the order is already paid for.
   */
  _ensureNotPaid() {
    if (this._isPaidFor) {
      throw this.constructor._PAID_FOR_ERROR;
    }
  }

  /**
   * Adds the product to the order.
   * @param  {Product} prod The product to add.
   * @return {Order}   This instance (for chaining).
   * @throws If the order is already paid for.
   */
  add(prod) {
    this._ensureNotPaid();
    this._props.add(prod.props);
    this._prods.push(prod);
    return this;
  }

  /**
   * Deletes the product from the order using its index (starts at 1).
   * You can find out the index using the logs from the `list()` method.
   * @param  {number} index The index of the product to delete.
   * @return {Order}  This instance (for chaining).
   * @throws If the order is already paid for.
   */
  deleteByIndex(index) {
    this._ensureNotPaid();

    if (--index >= 0 && index < this._prods.length) {
      this._props.sub(this._prods[index].props);
      this._prods.splice(index, 1);
    } else {
      console.log(_DELETE_LOG);
    }

    return this;
  }

  /**
   * Deletes the product from the order using its reference.
   * @param  {Product} prod The product to delete.
   * @return {Order}   This instance (for chaining).
   * @throws If the order is already paid for.
   */
  deleteByRef(prod) {
    const index = this._prods.indexOf(prod);
    this._ensureNotPaid();

    if (index >= 0) {
      this._props.sub(prod.props);
      this._prods.splice(index, 1);
    } else {
      console.log(_DELETE_LOG);
    }

    return this;
  }

  /**
   * Pays for the order and makes it immutable.
   * @return {Order} This instance (for chaining).
   * @throws If the order is already paid for.
   */
  payFor() {
    this._ensureNotPaid();
    this._isPaidFor = true;
    return this;
  }

  /**
   * Print the list of every product found in the order.
   * @param  {boolean} omitEnergy Whether to omit the
   *                              energy value from the output.
   * @param  {boolean} omitPrice  Whether to omit the
   *                              price from the output.
   * @return {Order}   This instance (for chaining).
   */
  printList(omitEnergy = false, omitPrice = false) {
    console.log("==== Your Order: ====");

    this._prods.forEach((prod, index) => {
      let output = `[${index + 1}]: ${prod.type}`;

      if (prod instanceof Burger) {
        output += `, ${prod.size} with ${prod.filling}`;
      } else if (prod instanceof Salad) {
        output += `, which weighs ${prod.weight} gramms`;
      }

      if (!omitEnergy) {
        output += ` [energy value: ${prod.energy}]`;
      }

      if (!omitPrice) {
        output += ` [price: ${prod.price}]`;
      }

      console.log(output);
    });

    console.log("=====================");
    return this;
  }
}
