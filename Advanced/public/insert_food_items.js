// Import the MongoDB Node.js driver
const MongoClient = require('mongodb').MongoClient;

// Connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "food_delivery_db";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define food items
const foodItems = [
    { name: "Pizza", price: 12.99 },
    { name: "Burger", price: 9.99 },
    { name: "Sushi", price: 14.99 }
];

// Connect to the MongoDB server
client.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log("Connected successfully to server");

  // Get the database
  const db = client.db(dbName);

  // Get the foods collection
  const collection = db.collection('foods');

  // Insert food items into the collection
  collection.insertMany(foodItems, (err, result) => {
    if (err) {
      console.error('Failed to insert food items into collection:', err);
      return;
    }
    console.log(`${result.insertedCount} food items inserted successfully`);
    client.close();
  });
});
