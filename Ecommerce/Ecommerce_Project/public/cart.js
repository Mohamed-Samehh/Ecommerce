document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products?inCart=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('No products found');
            }
            return response.json();
        })
        .then(data => {
            const cartProductsContainer = document.getElementById('cart-products');
            if (data.length != 0) {
                data.forEach(product => {
                    if (product.inCart) {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');
                        const imageUrl = product.image ? `data:image/jpeg;base64,${product.image}` : 'default-placeholder.png';
                        productDiv.innerHTML = `
                            <img src="${imageUrl}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p class="price">$${product.price}</p>
                            <button class="remove-from-cart" data-id="${product.id}">Remove from Cart</button>
                        `;
                        cartProductsContainer.appendChild(productDiv);
                    }
                });
                document.getElementById('checkout-button').style.display = 'block';
                document.getElementById('empty-cart-message').style.display = 'none';
            }

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    fetch('/api/toggle-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            this.parentElement.remove();
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
            });

            const checkoutButton = document.getElementById('checkout-button');
            checkoutButton.addEventListener('click', () => {
                window.location.href = 'payment.html';
            });
        })
        .catch(error => console.error('Error:', error));
});
