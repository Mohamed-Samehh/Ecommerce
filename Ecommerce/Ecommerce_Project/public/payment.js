document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products?inCart=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }
            return response.json();
        })
        .then(data => {
            const totalAmountElement = document.getElementById('total-amount');
            let totalAmount = 0;
            data.forEach(product => {
                totalAmount += parseFloat(product.price);
            });
            totalAmountElement.textContent = totalAmount.toFixed(2);

            const paymentForm = document.getElementById('payment-form');

            paymentForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const cardNum = document.getElementById('card-number').value;
                const expiryDate = document.getElementById('expiry-date').value;
                const cvv = document.getElementById('cvv').value;
                const cardHolder = document.getElementById('card-holder').value;
                const error = document.getElementById('error');

                if (cardNum === "" || expiryDate === "" || cvv === "" || cardHolder === "") {
                    error.textContent = "Please fill in all fields.";
                    error.style.display = "block";
                } else {
                    const formData = new FormData(paymentForm);
                    const paymentDetails = {
                        cardNumber: formData.get('cardNumber'),
                        expiryDate: formData.get('expiryDate'),
                        cvv: formData.get('cvv'),
                        cardHolder: formData.get('cardHolder'),
                        totalAmount: totalAmount
                    };

                    fetch('/api/payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentDetails)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Payment successful!');
                            window.location.href = 'index.html';
                        } else {
                            alert('Payment failed. Please try again.');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }
            });
        })
        .catch(error => console.error('Error:', error));
});
