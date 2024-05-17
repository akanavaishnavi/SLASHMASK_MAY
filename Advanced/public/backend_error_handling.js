app.post('/order', (req, res) => {
    const order = req.body;
    // Example: Check if the order contains items
    if (!order || !order.items || order.items.length === 0) {
        res.status(400).json({ error: 'Invalid order. Please provide items.' });
        return;
    }
    // Save the order to the database (not implemented here)
    console.log('Order received:', order);
    res.status(201).send('Order received');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
