document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('No products found');
            }
            return response.json();
        })
        .then(data => {
            const productsContainer = document.getElementById('products');
            if (data.length != 0) {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    const imageUrl = product.image ? `data:image/jpeg;base64,${product.image}` : 'default-placeholder.png';
                    productDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">$${product.price}</p>
                        <button class="add-to-cart" data-id="${product.id}">${product.inCart ? 'Remove from Cart' : 'Add to Cart'}</button>
                    `;
                    productsContainer.appendChild(productDiv);
                });
                document.getElementById('no-products-message').style.display = 'none';
            }

            document.querySelectorAll('.add-to-cart').forEach(button => {
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
                            if (data.inCart) {
                                this.innerText = 'Remove from Cart';
                            } else {
                                this.innerText = 'Add to Cart';
                            }
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
