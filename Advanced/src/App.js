// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchMenu, placeOrder } from './api';

function App() {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getMenu = async () => {
            const menuItems = await fetchMenu();
            setMenu(menuItems);
        };
        getMenu();
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
        setTotal(total + item.price);
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const order = { items: cart, total };
        try {
            await placeOrder(order);
            alert('Order placed successfully!');
            setCart([]);
            setTotal(0);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order. Please try again later.');
        }
    };

    return (
        <div className="App">
            <h1>Menu</h1>
            <ul>
                {menu.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price.toFixed(2)}
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default App;
