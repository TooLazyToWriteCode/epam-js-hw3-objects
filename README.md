# Homework OOP, prototype inheritance

## Deadline 17.08

### Create menu

Вы хозяин небольшого кафе быстрого питания. Ваше меню состоит из следующих позиций:

#### 1) Гамбургер

    - маленький (+50 тугриков, +20 калорий)
    - большой (+100 тугриков, +40 калорий)

    Гамбургер может быть с одним из нескольких видов начинок (обязательно):

    - сыром (+10 тугриков, +20 калорий)
    - салатом (+20 тугриков, +5 калорий)
    - картофелем (+15 тугриков, +10 калорий)

#### 2) Салат (цена и калории указаны за 100г)

    - Цезарь (+100 тугриков, +20 калорий)
    - Оливье (+50 тугриков, +80 калорий)

#### 3) Напиток

    - Кола (+50 тугриков, +40 калорий)
    - Кофе (+80 тугриков, +20 калорий)

Необходимо написать программу, для расчета стоимости и/или каллорийности заказа посетителя.
В заказе могут быть как одна, так и несколько позиций разных видов. (Например заказ может состоять из 2х гамбургеров(один большой, другой маленький), салата Оливье(150г) и кофе). В заказ можно как добавлять позиции, так и удалять из него лишнее (при условии, что оно там есть). После оплаты заказа он должен стать не редактируемым - ничего добавить или удалить из него больше нельзя.

**Комментарии**  
Задачу необходимо решить используя ООП & (ES5 || ES6). Крайне желательно использование наследования и композиции. Типы начинок, размеры надо сделать константами. Никаких [магических строк](<https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)#.D0.9F.D0.BB.D0.BE.D1.85.D0.B0.D1.8F_.D0.BF.D1.80.D0.B0.D0.BA.D1.82.D0.B8.D0.BA.D0.B0_.D0.BF.D1.80.D0.BE.D0.B3.D1.80.D0.B0.D0.BC.D0.BC.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D0.BD.D0.B8.D1.8F>) не должно быть.

#### Примерный вид класса гамбургер

```js
/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size     Размер
 * @param stuffing Начинка
 */
function Hamburger(size, stuffing) { ... }

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = ...
Hamburger.SIZE_LARGE = ...
Hamburger.STUFFING_CHEESE = ...
Hamburger.STUFFING_SALAD = ...
Hamburger.STUFFING_POTATO = ...

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () ...

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () ...

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () ...

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () ...
```

## Usage Examples

### Burger

```js
// A big burger with cheese.
const burger1 = new Burger(Burger.BIG, Burger.WITH_CHEESE);
// A small burger with potato.
const burger2 = new Burger(Burger.SMALL, Burger.WITH_POTATO);
// A small burger with salad.
const burger3 = new Burger(Burger.SMALL, Burger.WITH_SALAD);
// Error, unknown burger size provided.
const burger4 = new Burger("average");
// Error, no burger size provided.
const burger5 = new Burger();
// Error, unknown burger filling provided.
const burger6 = new Burger(Burger.SMALL, "fish");
// Error, no burger filling provided.
const burger7 = new Burger(Burger.SMALL);
// Get the burger energy value.
console.log(burger1.energy); // 60
// Get the burger price.
console.log(burger1.price); // 110
// Get the burger size.
console.log(burger1.size); // "big"
// Get the burger filling.
console.log(burger1.filling); // "cheese"
```

### Drink

```js
// A cup of coffee.
const drink1 = new Drink(Drink.COFFEE);
// A glass of cola.
const drink2 = new Drink(Drink.COLA);
// Error, unknown drink provided.
const drink3 = new Drink("tea");
// Error, no drink provided.
const drink4 = new Drink();
// Get the drink energy value.
console.log(drink1.energy); // 20
// Get the drink price.
console.log(drink1.price); // 80
// Get the drink type.
console.log(drink1.type); // "coffee"
```

### Salad

```js
// A Caesar salad, 100 grams.
const salad1 = new Salad(Salad.CAESAR);
// A Caesar salad, 156 grams.
const salad2 = new Salad(Salad.CAESAR, 156);
// An Olivier salad, 240 grams.
const salad3 = new Salad(Salad.OLIVIER, 240);
// Invalid salad weight provided: assume 100 grams.
const salad4 = new Salad(Salad.OLIVIER, -3);
// Error, unknown salad provided.
const salad5 = new Salad("crab");
// Error, no salad provided.
const salad6 = new Salad();
// Get the salad energy value.
console.log(salad1.energy); // 20
// Get the salad price.
console.log(salad1.price); // 100
// Get the salad type.
console.log(salad1.type); // "caesar"
// Get the salad weight.
console.log(salad1.weight); // 100
// Update the salad weight.
salad1.weight = 128;
console.log(salad1.weight); // 128
```

### Order

```js
// A random salad.
const salad = new Salad(Salad.CAESAR, 54);
// A random drink.
const drink = new Drink(Drink.COFFEE);
// The following can also be done separately.
// The price and energy properties are available,
// but they obviously do not support chaining.
// E is the energy value, P is the price.
new Order()
  // Add the salad.                     [+10.8E,  +54.0P]
  .add(salad)
  // Add the burger.                    [+30.0E,  +65.0P]
  .add(new Burger(Burger.SMALL, Burger.WITH_POTATO))
  // Add the cola.                      [+40.0E,  +50.0P]
  .add(new Drink(Drink.COLA))
  // Add the drink.                     [+20.0E,  +80.0P]
  .add(drink)
  // Add a big burger with cheese.      [+60.0E, +110.0P]
  .add(new Burger(Burger.BIG, Burger.WITH_CHEESE))
  // Add the coffee.                    [+20.0E,  +80.0P]
  .add(new Drink(Drink.COFFEE))
  // Delete the cola by its reference.  [-20.0E,  -80.0P]
  .deleteByRef(drink)
  // List the ordered products. The big burger is still here.
  .printAsList()
  // Delete the coffee by its index.    [-60.0E, -110.0P]
  .deleteByIndex(4)
  // List the ordered products again. The big burger is gone.
  .printAsList()
  // Add the salad.                     [+17.2E,  +86.0P]
  .add(new Salad(Salad.CAESAR, 86))
  // Outputs the energy value of 118.
  .printEnergy()
  // Outputs the price of 335.
  .printPrice()
  // Delete the salad by its reference. [-10.8E,  -54.0P]
  .deleteByRef(salad)
  // Pay for the order and lock it.
  .payFor()
  // List the ordered products.
  .printAsList()
  // Outputs the price of 281.
  .printPrice()
  // Outputs the energy value of 107.2.
  .printEnergy()
  // Outputs the price of 281.
  // Outputs the energy value of 107.2.
  .printInfo()
  // Error, the order is paid for.
  .add(new Drink(Drink.COLA));
```
