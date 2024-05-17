document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
// JavaScript to embed Google Maps
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}


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
            li.innerHTML = `${item.name} - $${(item.price * item.quantity).toFixed(2)} (${item.quantity}) 
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
});
