document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Fetch menu items from the backend
    fetch('http://localhost:5000/menu')
        .then(response => response.json())
        .then(menu => {
            const menuSection = document.getElementById('menu');
            menuSection.innerHTML = '';
            menu.forEach(item => {
                const foodItemElement = document.createElement('div');
                foodItemElement.className = 'food-item';
                foodItemElement.dataset.id = item._id;
                foodItemElement.dataset.name = item.name;
                foodItemElement.dataset.price = item.price;
                foodItemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <input type="number" class="quantity" min="1" value="1">
                    <button class="add-to-cart">Add to Cart</button>
                `;
                menuSection.appendChild(foodItemElement);
            });
            addEventListeners();
        });

    function addEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const foodItemElement = event.target.closest('.food-item');
                const quantity = parseInt(foodItemElement.querySelector('.quantity').value);
                const foodItem = {
                    id: foodItemElement.dataset.id,
                    name: foodItemElement.dataset.name,
                    price: parseFloat(foodItemElement.dataset.price),
                    quantity: quantity
                };

                addToCart(foodItem);
            });
        });
    }

    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }
        renderCart();
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        renderCart();
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name}- $${(item.price * item.quantity).toFixed(2)} (${item.quantity}) 
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>`;
cartItemsElement.appendChild(li);
total += item.price * item.quantity;
});

totalPriceElement.textContent = total.toFixed(2);

document.querySelectorAll('.remove-from-cart').forEach(button => {
button.addEventListener('click', event => {
const itemId = event.target.dataset.id;
removeFromCart(itemId);
});
});
}

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
});
