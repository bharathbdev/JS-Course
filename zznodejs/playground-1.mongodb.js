// MongoDB Playground - Basic Operations

// The current database to use.
use("userdb");

db.getCollection("users").find({});
// ========== CREATE COLLECTION & INSERT DATA ==========

// Insert single document
db.getCollection("learn").insertOne({
    name: "John",
    age: 25
});

// Insert multiple documents
db.getCollection("learn").insertMany([
    { name: "Alice", age: 30 },
    { name: "Bob", age: 22 },
    { name: "Charlie", age: 35 },
    { name: "Diana", age: 28 }
]);

// ========== READ OPERATIONS ==========

// Find all documents
db.getCollection("learn").find({});

// Find with query condition
db.getCollection("learn").find({ name: "John" });

// Find with age condition
db.getCollection("learn").find({ age: { $gt: 25 } });

// ========== SORTING ==========

// Sort by age ascending
db.getCollection("learn").find({}).sort({ age: 1 });

// Sort by age descending  
db.getCollection("learn").find({}).sort({ age: -1 });

// Sort by name alphabetically
db.getCollection("learn").find({}).sort({ name: 1 });

// ========== LIMIT & SKIP ==========

// Limit results to 2 documents
db.getCollection("learn").find({}).limit(2);

// Skip first 2 documents
db.getCollection("learn").find({}).skip(2);


// ========== UPDATE OPERATIONS ==========

// Update one document
db.getCollection("learn").updateOne(
    { name: "John" },
    { $set: { age: 26 } }
);


// ========== DELETE OPERATIONS ==========

// Delete one document
db.getCollection("learn").deleteOne({ name: "Bob" });

// Delete multiple documents
db.getCollection("learn").deleteMany({ });
