document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    
    checkoutButton.addEventListener('click', () => {
        fetch('/api/products?inCart=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                return response.json();
            })
            .then(data => {
                window.location.href = 'payment.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to load cart data. Please try again.");
            });
    });

    fetch('/api/products?inCart=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('No products in cart');
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
                        const imageUrl = `data:image/jpeg;base64,${product.image}`;
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
            } else {
                document.getElementById('checkout-button').style.display = 'none';
                document.getElementById('empty-cart-message').style.display = 'block';
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
                            if (cartProductsContainer.children.length === 0) {
                                document.getElementById('checkout-button').style.display = 'none';
                                document.getElementById('empty-cart-message').style.display = 'block';
                            }
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
