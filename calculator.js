class Properties {
  static _FLOAT_PRECISION = 8;

  /**
   * @param {Object} props
   * @param {number} props.energy
   * @param {string} props.id
   * @param {number} props.price
   */
  constructor(props = {}) {
    this._energy = props.energy || 0;
    this._id     = props.id     || "";
    this._price  = props.price  || 0;
  }

  get dataCopy() {
    return Object.assign({}, this);
  }

  get energy() {
    return this._energy;
  }

  get id() {
    return this._id;
  }

  get price() {
    return this._price;
  }

  /** @param {Properties} props */
  addToCurrent(props) {
    Object.keys(this).forEach((propName) => {
      if (propName !== "_id") {
        this[propName] = Number((this[propName] + props[propName])
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }

  /** @param {Properties} props */
  subFromCurrent(props) {
    Object.keys(this).forEach((propName) => {
      if (propName !== "_id") {
        this[propName] = Number((this[propName] - props[propName])
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }

  /** @param {number} value */
  mulCurrent(value) {
    Object.keys(this).forEach((propName) => {
      if (propName !== "_id") {
        this[propName] = Number((this[propName] * value)
          .toFixed(this.constructor._FLOAT_PRECISION));
      }
    });

    return this;
  }
}

class Product {
  static _ERRORS_INITED = false;

  static NAME = "product";

  /** @type {Error} */
  static FILLING_FAIL_ERROR;

  /** @type {Error} */
  static SIZE_FAIL_ERROR;

  /** @type {Error} */
  static TYPE_FAIL_ERROR;

  _props = new Properties();
  _type = null;

  constructor() {
    if (!this.constructor._ERRORS_INITED) {
      this.constructor.FILLING_FAIL_ERROR = new Error(
        `the ${this.constructor.NAME} filling is not chosen or is unknown`
      );

      this.constructor.SIZE_FAIL_ERROR = new Error(
        `the ${this.constructor.NAME} size is not chosen or is unknown`
      );

      this.constructor.TYPE_FAIL_ERROR = new Error(
        `the ${this.constructor.NAME} type is not chosen or is unknown`
      );
    } else {
      this.constructor._ERRORS_INITED = true;
    }
  }

  get energy() {
    return this._props.energy;
  }

  get price() {
    return this._props.price;
  }

  get props() {
    return this._props.dataCopy;
  }

  get type() {
    return this._type instanceof Properties ? this._type.id : "product";
  }

  printEnergy() {
    console.log(
      `Your ${this.constructor.NAME} consists of ${this.energy} calories.`
    );

    return this;
  }

  printInfo() {
    this.printPrice();
    this.printEnergy();
    return this;
  }

  printPrice() {
    console.log(
      `Your ${this.constructor.NAME} is worth ${this.price} tugriks.`
    );

    return this;
  }
}

class Burger extends Product {
  static NAME = "burger";

  static BIG = new Properties({ id: "big", energy: 40, price: 100 });
  static SMALL = new Properties({ id: "small", energy: 20, price: 50 });

  static WITH_CHEESE =
    new Properties({ id: "cheese", energy: 20, price: 10 });
  static WITH_POTATO =
    new Properties({ id: "potato", energy: 10, price: 15 });
  static WITH_SALAD =
    new Properties({ id: "salad", energy: 5, price: 20 });

  /**
   * @param {Properties} size
   * @param {Properties} filling
   */
  constructor(size, filling) {
    super();

    this._size = size;

    if (size instanceof Properties) {
      this._props.addToCurrent(this._size);
    } else {
      throw this.constructor.SIZE_FAIL_ERROR;
    }
  
    this._filling = filling;

    if (filling instanceof Properties) {
      this._props.addToCurrent(this._filling);
    } else {
      throw this.constructor.FILLING_FAIL_ERROR;
    }
  }

  get filling() {
    return this._filling.id;
  }

  get size() {
    return this._size.id;
  }

  /** @return {string} */
  get type() {
    return this.constructor.NAME;
  }
}

class Drink extends Product {
  static NAME = "drink";

  static COFFEE = new Properties({ id: "coffee", energy: 20, price: 80 });
  static COLA = new Properties({ id: "cola", energy: 40, price: 50 });

  /** @param {Properties} type */
  constructor(type) {
    super();
  
    this._type = type;

    if (type instanceof Properties) {
      this._props.addToCurrent(this._type);
    } else {
      throw this.constructor.TYPE_FAIL_ERROR;
    }
  }
}

class Salad extends Product {
  static _NO_WEIGHT_MSG = "the salad weight is not chosen, assuming 100g";
  static _WEIGHT_FAIL_MSG = "the salad weight is invalid, assuming 100g";

  static NAME = "salad";

  static CAESAR = new Properties({ id: "caesar", energy: 20, price: 100 });
  static OLIVIER = new Properties({ id: "olivier", energy: 80, price: 50 });

  _weight = 100;

  /**
   * @param {Properties} type
   * @param {number}     weight
   */
  constructor(type, weight) {
    super();
  
    this._type = type;

    if (type instanceof Properties) {
      this._props.addToCurrent(this._type);
    } else {
      throw this.constructor.TYPE_FAIL_ERROR;
    }

    switch (typeof weight) {
      case "undefined":
        console.log(this.constructor._NO_WEIGHT_MSG);
        break;
      case "number":
        if (weight >= 0) {
          this.weight = weight;
          break;
        }
      default:
        console.warn(this.constructor._WEIGHT_FAIL_MSG);
    }
  }

  get weight() {
    return this._weight;
  }

  /** @param {number} weight */
  set weight(weight) {
    // Do not use _weight as a setter elsewhere!
    this._props.mulCurrent(weight / this._weight);
    this._weight = weight;
  }
}

class Order extends Product {
  static _DELETE_NOT_FOUND_LOG = "the product is not found, doing nothing";

  static NAME = "order";

  static PAID_FOR_ERROR = new Error("the product is already paid for");

  _isPaidFor = false;

  /** @type {Product[]} */
  _prods = [];

  _ensureNotPaid() {
    if (this._isPaidFor) {
      throw this.constructor.PAID_FOR_ERROR;
    }
  }

  /** @param {Product} prod */
  add(prod) {
    this._ensureNotPaid();
    this._props.addToCurrent(prod.props);
    this._prods.push(prod);
    return this;
  }

  /** @param {number} index */
  deleteByIndex(index) {
    // The index in this method starts at 1, not 0!
    this._ensureNotPaid();

    if (--index >= 0 && index < this._prods.length) {
      this._props.subFromCurrent(this._prods[index].props);
      this._prods.splice(index, 1);
    } else {
      console.log(_DELETE_LOG);
    }

    return this;
  }

  /** @param {Product} prod */
  deleteByRef(prod) {
    const index = this._prods.indexOf(prod);
    this._ensureNotPaid();

    if (index >= 0) {
      this._props.subFromCurrent(prod.props);
      this._prods.splice(index, 1);
    } else {
      console.log(_DELETE_LOG);
    }

    return this;
  }

  payFor() {
    this._ensureNotPaid();
    this._isPaidFor = true;
    return this;
  }

  printAsList(omitEnergy = false, omitPrice = false) {
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
