const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "food_delivery_db";

let db;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }

    db = client.db(dbName);
    console.log("Connected successfully to MongoDB server");

    // Start the server after the database connection is established
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

// Routes
app.get('/menu', async (req, res) => {
    try {
        const foods = await db.collection('foods').find().toArray();
        res.json(foods);
    } catch (err) {
        console.error('Failed to fetch menu items:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/order', async (req, res) => {
    const order = req.body;
    if (!order || !order.items || order.items.length === 0) {
        return res.status(400).json({ error: 'Invalid order. Please provide items.' });
    }

    try {
        const result = await db.collection('orders').insertOne(order);
        res.status(201).send('Order received');
    } catch (err) {
        console.error('Failed to place order:', err);
        res.status(500).send('Internal Server Error');
    }
});
