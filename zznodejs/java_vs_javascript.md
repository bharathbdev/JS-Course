# Java vs JavaScript — Full Comparison (Basic to Advanced)

---

## 1. LANGUAGE BASICS

| Concept                | Java                                     | JavaScript (Node.js)              |
| ---------------------- | ---------------------------------------- | --------------------------------- |
| Typing                 | Strongly typed (static)                  | Weakly typed (dynamic)            |
| Compiled / Interpreted | Compiled to bytecode (JVM)               | Interpreted (V8 engine)           |
| Entry point            | `public static void main(String[] args)` | Top-level code or `node file.js`  |
| Semicolons             | Required                                 | Optional (ASI applies)            |
| Null safety            | `NullPointerException` at runtime        | `null` and `undefined` both exist |
| Print to console       | `System.out.println("hi")`               | `console.log("hi")`               |

---

## 2. VARIABLES

| Concept          | Java                    | JavaScript                          |
| ---------------- | ----------------------- | ----------------------------------- |
| Declare variable | `int x = 5;`            | `let x = 5;`                        |
| Constant         | `final int X = 5;`      | `const X = 5;`                      |
| Auto type infer  | `var x = 5;` (Java 10+) | `let x = 5;` (always inferred)      |
| Global variable  | Static class field      | `var` (avoid) or module-level `let` |
| Block scope      | Yes                     | Yes (`let`, `const`)                |
| Function scope   | No                      | Yes (`var` only)                    |

---

## 3. DATA TYPES

| Type       | Java                           | JavaScript                         |
| ---------- | ------------------------------ | ---------------------------------- |
| Integer    | `int`, `long`, `short`, `byte` | `Number` (all numbers are float64) |
| Float      | `float`, `double`              | `Number`                           |
| BigInteger | `BigInteger`                   | `BigInt` (e.g. `100n`)             |
| String     | `String` (object)              | `string` (primitive)               |
| Boolean    | `boolean`                      | `boolean`                          |
| Null       | `null`                         | `null` and `undefined`             |
| Character  | `char`                         | No char type — use string          |
| Object     | `Object`                       | `object`                           |
| Array      | `int[]`, `String[]`            | `Array` (dynamic, mixed types ok)  |
| Type check | `instanceof`, `getClass()`     | `typeof`, `instanceof`             |

---

## 4. STRINGS

| Operation         | Java                                     | JavaScript                               |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| Create            | `String s = "hello";`                    | `let s = "hello";`                       |
| Concatenate       | `"Hello" + " " + name`                   | `` `Hello ${name}` `` (template literal) |
| Length            | `s.length()`                             | `s.length`                               |
| Uppercase         | `s.toUpperCase()`                        | `s.toUpperCase()`                        |
| Substring         | `s.substring(0, 3)`                      | `s.slice(0, 3)`                          |
| Contains          | `s.contains("lo")`                       | `s.includes("lo")`                       |
| Split             | `s.split(",")`                           | `s.split(",")`                           |
| Trim              | `s.trim()`                               | `s.trim()`                               |
| Replace           | `s.replace("a", "b")`                    | `s.replace("a", "b")`                    |
| Multi-line string | Text Blocks (Java 15+) `"""..."""`       | Template literals `` `...` ``            |
| StringBuilder     | `StringBuilder sb = new StringBuilder()` | Array + `join()` or just `+=`            |

---

## 5. ARRAYS

| Operation      | Java                             | JavaScript                    |
| -------------- | -------------------------------- | ----------------------------- |
| Declare        | `int[] arr = {1, 2, 3};`         | `let arr = [1, 2, 3];`        |
| Length         | `arr.length`                     | `arr.length`                  |
| Access element | `arr[0]`                         | `arr[0]`                      |
| Fixed size?    | Yes (fixed length)               | No (dynamic)                  |
| Add element    | Not directly (use List)          | `arr.push(4)`                 |
| Remove last    | Not directly                     | `arr.pop()`                   |
| Iterate        | `for (int x : arr)`              | `arr.forEach(x => ...)`       |
| Map            | `Arrays.stream(arr).map(...)`    | `arr.map(x => ...)`           |
| Filter         | `Arrays.stream(arr).filter(...)` | `arr.filter(x => ...)`        |
| Reduce         | `Arrays.stream(arr).reduce(...)` | `arr.reduce((acc, x) => ...)` |
| Sort           | `Arrays.sort(arr)`               | `arr.sort()`                  |
| Spread/copy    | `Arrays.copyOf(arr, arr.length)` | `[...arr]`                    |

---

## 6. COLLECTIONS (Java) vs BUILT-INS (JavaScript)

| Java Collection                  | JS Equivalent          | Notes                           |
| -------------------------------- | ---------------------- | ------------------------------- |
| `ArrayList<T>`                   | `Array`                | Dynamic list                    |
| `LinkedList<T>`                  | `Array`                | JS Array is flexible enough     |
| `HashMap<K,V>`                   | `Object` / `Map`       | `Map` preserves insertion order |
| `HashSet<T>`                     | `Set`                  | Unique values only              |
| `LinkedHashMap<K,V>`             | `Map`                  | JS `Map` preserves order        |
| `TreeMap<K,V>`                   | `Map` + manual sort    | No built-in sorted map in JS    |
| `Stack<T>`                       | `Array` (push/pop)     | Use array as stack              |
| `Queue<T>`                       | `Array` (push/shift)   | Use array as queue              |
| `PriorityQueue<T>`               | No built-in            | Implement manually              |
| `Collections.unmodifiableList()` | `Object.freeze([...])` | Immutable collection            |

### Code Examples:

**ArrayList vs Array**

```java
// Java
ArrayList<String> list = new ArrayList<>();
list.add("apple");
list.get(0);         // apple
list.remove("apple");
list.size();
```

```js
// JavaScript
const list = [];
list.push("apple");
list[0]; // apple
list.splice(list.indexOf("apple"), 1);
list.length;
```

**HashMap vs Map/Object**

```java
// Java
HashMap<String, Integer> map = new HashMap<>();
map.put("age", 25);
map.get("age");      // 25
map.containsKey("age");
map.remove("age");
```

```js
// JavaScript — using Map
const map = new Map();
map.set("age", 25);
map.get("age"); // 25
map.has("age");
map.delete("age");

// or plain Object
const obj = { age: 25 };
obj.age; // 25
"age" in obj;
delete obj.age;
```

**HashSet vs Set**

```java
// Java
HashSet<String> set = new HashSet<>();
set.add("a");
set.contains("a");   // true
set.remove("a");
```

```js
// JavaScript
const set = new Set();
set.add("a");
set.has("a"); // true
set.delete("a");
```

---

## 7. OOP CONCEPTS

| Concept            | Java                                 | JavaScript                               |
| ------------------ | ------------------------------------ | ---------------------------------------- |
| Class              | `class Dog { }`                      | `class Dog { }`                          |
| Constructor        | `public Dog(String name) { }`        | `constructor(name) { }`                  |
| Inheritance        | `class Dog extends Animal`           | `class Dog extends Animal`               |
| Super call         | `super(name)`                        | `super(name)`                            |
| Interface          | `interface Runnable { void run(); }` | Simulated with base class + Error throws |
| Abstract class     | `abstract class Shape { }`           | Simulated (throw in base method)         |
| Access modifiers   | `public`, `private`, `protected`     | `#field` (private), rest is public       |
| Static members     | `static int count;`                  | `static count = 0;`                      |
| Method overriding  | `@Override void speak()`             | Just redefine the method in child class  |
| Method overloading | Supported natively                   | Simulated via argument checks            |
| Enum               | `enum Color { RED, GREEN, BLUE }`    | `Object.freeze({ RED: "RED", ... })`     |
| Getters/Setters    | `getAge()` / `setAge()`              | `get age()` / `set age(val)`             |
| `instanceof`       | `dog instanceof Animal`              | `dog instanceof Animal`                  |

---

## 8. INTERFACES vs JS SIMULATION

```java
// Java
interface Drawable {
    void draw();
    void resize(int factor);
}

class Circle implements Drawable {
    public void draw() { System.out.println("Drawing circle"); }
    public void resize(int factor) { System.out.println("Resizing by " + factor); }
}
```

```js
// JavaScript — simulated interface
class Drawable {
  draw() {
    throw new Error("draw() must be implemented");
  }
  resize(factor) {
    throw new Error("resize() must be implemented");
  }
}

class Circle extends Drawable {
  draw() {
    console.log("Drawing circle");
  }
  resize(factor) {
    console.log(`Resizing by ${factor}`);
  }
}
```

---

## 9. GENERICS vs JS DYNAMIC TYPING

```java
// Java — Generics enforce type safety at compile time
ArrayList<String> names = new ArrayList<String>();
names.add("Alice");
// names.add(123);  // Compile error!
```

```js
// JavaScript — No generics, arrays accept any type
const names = [];
names.push("Alice");
names.push(123); // Allowed — no type enforcement
// Use TypeScript for generic-like behavior: Array<string>
```

---

## 10. EXCEPTION HANDLING

| Concept            | Java                                        | JavaScript                         |
| ------------------ | ------------------------------------------- | ---------------------------------- |
| Try-catch          | `try { } catch (Exception e) { }`           | `try { } catch (e) { }`            |
| Finally            | `finally { }`                               | `finally { }`                      |
| Throw error        | `throw new IllegalArgumentException("msg")` | `throw new Error("msg")`           |
| Custom exception   | `class MyException extends Exception`       | `class MyError extends Error`      |
| Checked exceptions | Yes (must declare or catch)                 | No concept of checked exceptions   |
| Multiple catch     | `catch (TypeA \| TypeB e)`                  | Single catch, check `e instanceof` |

```java
// Java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}
```

```js
// JavaScript
try {
  let result = riskyOperation();
} catch (e) {
  if (e instanceof TypeError) {
    console.log("Type error:", e.message);
  } else {
    console.log("Error:", e.message);
  }
} finally {
  console.log("Always runs");
}
```

---


---


---

## 13. MODULES / PACKAGES

| Concept          | Java                          | JavaScript (Node.js)                |
| ---------------- | ----------------------------- | ----------------------------------- |
| Package/module   | `package com.example.app;`    | `// ES Module` or CommonJS          |
| Import           | `import java.util.ArrayList;` | `import { fn } from './file.js'`    |
| Export           | Public class in package       | `export function fn() { }`          |
| CommonJS (Node)  | N/A                           | `module.exports = {}` / `require()` |
| Third-party libs | Maven / Gradle                | npm / yarn                          |
| Package config   | `pom.xml` / `build.gradle`    | `package.json`                      |
| Lock file        | N/A                           | `package-lock.json` / `yarn.lock`   |

---

## 14. PACKAGE MANAGERS & BUILD TOOLS

| Tool / Concept      | Java                                  | JavaScript / Node.js              |
| ------------------- | ------------------------------------- | --------------------------------- |
| Package manager     | Maven, Gradle                         | npm, yarn, pnpm                   |
| Package registry    | Maven Central, JFrog                  | npmjs.com                         |
| Project config file | `pom.xml`, `build.gradle`             | `package.json`                    |
| Install dependency  | `mvn install` / `./gradlew build`     | `npm install`                     |
| Add dependency      | Edit `pom.xml`/`build.gradle`         | `npm install express`             |
| Run project         | `mvn exec:java` / `java -jar app.jar` | `node index.js` / `npm start`     |
| Build JAR/dist      | `mvn package` → `.jar`                | `npm run build` → `dist/`         |
| Task runner         | Maven lifecycle, Gradle tasks         | npm scripts in `package.json`     |
| Dependency scope    | `compile`, `test`, `provided`         | `dependencies`, `devDependencies` |

---

## 15. WEB FRAMEWORK — Servlet/Spring vs Express

| Concept              | Java (Servlet / Spring Boot)             | Node.js (Express)                      |
| -------------------- | ---------------------------------------- | -------------------------------------- |
| HTTP Server          | Tomcat / Jetty (embedded in Spring Boot) | Built-in `http` module / Express       |
| Router               | `@RequestMapping("/path")`               | `app.get("/path", handler)`            |
| Middleware           | Servlet Filter / Spring Interceptor      | `app.use(middleware)`                  |
| Request object       | `HttpServletRequest`                     | `req` (`express.Request`)              |
| Response object      | `HttpServletResponse`                    | `res` (`express.Response`)             |
| JSON response        | `@ResponseBody` + `@RestController`      | `res.json({ key: value })`             |
| Query params         | `request.getParameter("id")`             | `req.query.id`                         |
| Path params          | `@PathVariable`                          | `req.params.id`                        |
| Request body         | `@RequestBody`                           | `req.body` (with `express.json()`)     |
| Static files         | `webapp/` folder                         | `express.static("public")`             |
| Template engine      | Thymeleaf, JSP                           | EJS, Pug, Handlebars                   |
| Error handling       | `@ExceptionHandler`                      | `app.use((err, req, res, next) => {})` |
| Dependency injection | Spring IoC Container (`@Autowired`)      | Manual / libraries like `awilix`       |
| ORM / DB             | Hibernate, JPA                           | Sequelize, Prisma, Mongoose            |
| Auth                 | Spring Security                          | Passport.js, JWT libraries             |
| CORS                 | Spring CORS config                       | `cors` npm package                     |

### Hello World Comparison:

```java
// Java Spring Boot
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```

```js
// Node.js Express
const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000);
```

---

## 16. SERVLET vs EXPRESS MIDDLEWARE

| Java Servlet                   | Express Middleware                    |
| ------------------------------ | ------------------------------------- |
| `init()` — runs on startup     | `app.use(fn)` — runs on every request |
| `doGet()`, `doPost()`          | `app.get()`, `app.post()`             |
| `FilterChain.doFilter()`       | `next()`                              |
| `web.xml` configuration        | `app.use()` registration order        |
| Session via `HttpSession`      | `express-session` middleware          |
| Logging via `Filter`           | `morgan` middleware                   |
| Body parsing via `getReader()` | `express.json()` middleware           |

```java
// Java Servlet Filter
public class LogFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("Request received");
        chain.doFilter(req, res);  // pass to next
        System.out.println("Response sent");
    }
}
```

```js
// Express Middleware
app.use((req, res, next) => {
  console.log("Request received");
  next(); // pass to next
  // Note: can't easily run after response in same fn — use res.on("finish")
});
```

---

## 17. IDE COMPARISON

| Feature         | Java IDEs                              | JavaScript / Node.js IDEs         |
| --------------- | -------------------------------------- | --------------------------------- |
| Primary IDE     | IntelliJ IDEA, Eclipse, NetBeans       | VS Code, WebStorm                 |
| Free option     | Eclipse, IntelliJ Community            | VS Code (free & best)             |
| Debugger        | Built-in (IntelliJ, Eclipse)           | VS Code debugger, Chrome DevTools |
| Linter          | Checkstyle, SpotBugs                   | ESLint                            |
| Formatter       | google-java-format, IntelliJ formatter | Prettier                          |
| Auto-complete   | IntelliJ AI, Eclipse JDT               | VS Code IntelliSense, Copilot     |
| Refactoring     | Excellent in IntelliJ                  | Good in VS Code + WebStorm        |
| Test runner     | JUnit in IDE                           | Jest, Mocha in terminal/IDE       |
| Git integration | Built-in (IntelliJ, Eclipse EGit)      | Built-in VS Code Source Control   |

---

## 18. TESTING

| Concept             | Java                          | JavaScript              |
| ------------------- | ----------------------------- | ----------------------- |
| Unit test framework | JUnit 5, TestNG               | Jest, Mocha, Jasmine    |
| Assertion library   | AssertJ, Hamcrest             | Jest assertions, Chai   |
| Mocking             | Mockito                       | Jest mocks, Sinon       |
| Integration testing | Spring Test, RestAssured      | Supertest (for Express) |
| Code coverage       | JaCoCo                        | Istanbul / nyc          |
| Run tests           | `mvn test` / `./gradlew test` | `npm test`              |

---

## 19. QUICK SYNTAX CHEAT SHEET

| Feature         | Java                              | JavaScript                                    |
| --------------- | --------------------------------- | --------------------------------------------- |
| If-else         | `if (x > 0) { } else { }`         | `if (x > 0) { } else { }`                     |
| Ternary         | `x > 0 ? "pos" : "neg"`           | `x > 0 ? "pos" : "neg"`                       |
| For loop        | `for (int i = 0; i < 5; i++)`     | `for (let i = 0; i < 5; i++)`                 |
| For-each        | `for (String s : list)`           | `for (const s of list)`                       |
| While           | `while (x > 0)`                   | `while (x > 0)`                               |
| Switch          | `switch (val) { case 1: break; }` | `switch (val) { case 1: break; }`             |
| Null check      | `obj != null`                     | `obj !== null && obj !== undefined`           |
| Nullish default | `obj != null ? obj : "default"`   | `obj ?? "default"`                            |
| String to int   | `Integer.parseInt("5")`           | `parseInt("5")` or `Number("5")`              |
| Int to string   | `String.valueOf(5)` or `"" + 5`   | `String(5)` or `` `${5}` ``                   |
| Array to string | `Arrays.toString(arr)`            | `arr.join(", ")`                              |
| Object to JSON  | Gson / Jackson library            | `JSON.stringify(obj)`                         |
| JSON to Object  | Gson / Jackson library            | `JSON.parse(jsonString)`                      |
| Sleep/delay     | `Thread.sleep(1000)`              | `await new Promise(r => setTimeout(r, 1000))` |
| Random number   | `Math.random()`                   | `Math.random()`                               |
| Math power      | `Math.pow(2, 3)`                  | `2 ** 3` or `Math.pow(2, 3)`                  |

---

## 20. ECOSYSTEM SUMMARY

| Category          | Java                                    | JavaScript / Node.js                 |
| ----------------- | --------------------------------------- | ------------------------------------ |
| Runtime           | JVM (Java Virtual Machine)              | V8 engine (Node.js)                  |
| Web framework     | Spring Boot, Quarkus, Micronaut         | Express, Fastify, NestJS, Koa        |
| ORM               | Hibernate, JPA, MyBatis                 | Sequelize, Prisma, TypeORM, Mongoose |
| Testing           | JUnit, Mockito, RestAssured             | Jest, Mocha, Supertest, Cypress      |
| Build tool        | Maven, Gradle                           | npm, yarn, pnpm, Webpack, Vite       |
| Containerization  | Docker + JVM image                      | Docker + Node image (smaller)        |
| Cloud             | Spring Cloud, AWS SDK                   | AWS Lambda, Serverless, Vercel       |
| Microservices     | Spring Cloud, Quarkus                   | NestJS, Fastify, tRPC                |
| Message queue     | Kafka, RabbitMQ (Java clients)          | Kafka.js, amqplib (Node clients)     |
| Logging           | Log4j, SLF4j, Logback                   | Winston, Morgan, Pino                |
| Config management | Spring Config, `application.properties` | dotenv, `process.env`                |
| Type safety       | Built-in (static typing)                | TypeScript (optional)                |
