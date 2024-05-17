document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
    } else {
        const order = {
            items: cart,
            total: parseFloat(totalPriceElement.textContent)
        };

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (response.ok) {
                alert('Order placed successfully!');
                cart = [];
                renderCart();
            } else {
                throw new Error('Failed to place order.');
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order. Please try again later.');
        });
    }
});
