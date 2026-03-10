// ============================================================
// CORE CONCEPTS OF OOP IN JAVASCRIPT
// ============================================================

// ------------------------------------------------------------
// 1. CLASS & OBJECT
// A class is a blueprint; an object is an instance of it.
// ------------------------------------------------------------
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
}

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");

console.log(dog.name);  // Dog
console.log(cat.sound); // Meow


// ------------------------------------------------------------
// 2. ENCAPSULATION
// Bundling data and methods together, hiding internal details.
// ------------------------------------------------------------
class BankAccount {
  #balance = 0; // private — cannot be accessed outside

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(500);
console.log(acc.getBalance()); // 500
// console.log(acc.#balance);  // Error! Private field


// ------------------------------------------------------------
// 3. INHERITANCE
// A child class inherits properties and methods from a parent.
// ------------------------------------------------------------
class AnimalBase {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends AnimalBase {
  speak() {
    console.log(`${this.name} barks.`); // overrides parent method
  }
}

const d = new Dog("Rex");
d.speak(); // Rex barks.


// ------------------------------------------------------------
// 4. POLYMORPHISM
// Same method name, different behavior depending on the object.
// ------------------------------------------------------------
class Shape {
  area() { return 0; }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}

const shapes = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(s => console.log(s.area()));
// 78.539...
// 24


// ------------------------------------------------------------
// 5. ABSTRACTION
// Expose only what is necessary, hide complex implementation.
// ------------------------------------------------------------
class CoffeeMachine {
  #heatWater() { console.log("Heating water..."); }   // hidden
  #grindBeans() { console.log("Grinding beans..."); } // hidden

  makeCoffee() { // only this is exposed to the user
    this.#heatWater();
    this.#grindBeans();
    console.log("Coffee is ready!");
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee();


// ------------------------------------------------------------
// 6. METHOD OVERRIDING
// A child class provides its own implementation of a method
// that already exists in the parent class.
// ------------------------------------------------------------
class Vehicle {
  move() {
    console.log("The vehicle moves.");
  }
}

class Car extends Vehicle {
  move() {
    // overrides the parent's move()
    console.log("The car drives on the road.");
  }
}

class Boat extends Vehicle {
  move() {
    // overrides the parent's move()
    console.log("The boat sails on water.");
  }
}

const vehicles = [new Vehicle(), new Car(), new Boat()];
vehicles.forEach(v => v.move());
// The vehicle moves.
// The car drives on the road.
// The boat sails on water.


// ------------------------------------------------------------
// 7. METHOD OVERLOADING
// JavaScript does NOT natively support overloading, but we can
// simulate it by checking the number/type of arguments.
// ------------------------------------------------------------
class Calculator {
  add(a, b, c) {
    if (c !== undefined) {
      return a + b + c; // called with 3 args
    }
    return a + b;       // called with 2 args
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));      // 5
console.log(calc.add(2, 3, 4));   // 9


// ------------------------------------------------------------
// 8. INTERFACE (simulated)
// JavaScript has no built-in interface keyword, but we can
// enforce a "contract" by throwing errors in a base class.
// ------------------------------------------------------------





// ------------------------------------------------------------
// 9. ENUM (simulated)
// JavaScript has no built-in enum, but we use Object.freeze()
// to create immutable constant sets.
// ------------------------------------------------------------
const Direction = Object.freeze({
  UP:    "UP",
  DOWN:  "DOWN",
  LEFT:  "LEFT",
  RIGHT: "RIGHT",
});

const Status = Object.freeze({
  PENDING:   0,
  APPROVED:  1,
  REJECTED:  2,
});

let currentDirection = Direction.UP;
console.log(currentDirection);          // UP

let orderStatus = Status.APPROVED;
console.log(orderStatus);               // 1

// Attempting to modify is silently ignored (or throws in strict mode)
Direction.UP = "DOWN";
console.log(Direction.UP);              // Still "UP" — frozen!


// ============================================================
// ACCESS MODIFIERS
// ============================================================
//
//  Java has 4:  public | protected | (default/package) | private
//  JavaScript has:
//    - public  → default (everything is public unless marked private)
//    - private → use # prefix (ES2022+)
//    - protected → NO native support, simulated with convention (_name)
//
// ------------------------------------------------------------

class Person {
  // PUBLIC — accessible from anywhere
  name;

  // PRIVATE — accessible only inside this class (#)
  #age;

  // PROTECTED (convention) — prefix with _ to signal "internal use"
  _salary;

  constructor(name, age, salary) {
    this.name    = name;
    this.#age    = age;
    this._salary = salary;
  }

  // public method — anyone can call
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }

  // private method — only used inside the class
  #calculateTax() {
    return this._salary * 0.2;
  }

  // public method exposes private data in a controlled way
  getDetails() {
    console.log(`Name: ${this.name}, Age: ${this.#age}, Tax: ${this.#calculateTax()}`);
  }
}

const p = new Person("Alice", 30, 5000);

p.greet();           // ✅ Hi, I am Alice
p.getDetails();      // ✅ Name: Alice, Age: 30, Tax: 1000

console.log(p.name);     // ✅ Alice      (public)
console.log(p._salary);  // ⚠️  5000     (accessible but convention says "don't touch")
// console.log(p.#age);  // ❌ SyntaxError: private field


// ------------------------------------------------------------
// Access Modifiers — Quick Reference
// ------------------------------------------------------------
//
//  Modifier     | Same Class | Child Class | Outside Class
//  -------------|------------|-------------|---------------
//  public       |    ✅      |     ✅      |      ✅
//  protected(_) |    ✅      |     ✅      |   ⚠️ (convention only)
//  private (#)  |    ✅      |     ❌      |      ❌
//

