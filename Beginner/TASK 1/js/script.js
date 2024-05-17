document.addEventListener("DOMContentLoaded", function() {
    // Get all the "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.product button');

    // Add click event listener to each button
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Toggle the 'added' class when button is clicked
            event.target.classList.toggle('added');

            // Change button text based on class state
            if (event.target.classList.contains('added')) {
                event.target.textContent = 'Added to Cart';
            } else {
                event.target.textContent = 'Add to Cart';
            }
        });
    });
});
