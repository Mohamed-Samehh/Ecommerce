Ecommerce - Clothing Store

Overview
Ecommerce is an interactive online clothing store designed to provide a seamless shopping experience for users. It features functionalities from browsing products to managing shopping carts and processing payments.

Features
Ecommerce offers a range of features to ensure a smooth and engaging user experience:
- Product Listing: Displays a list of available products with details such as name, description, price, and image.
- Shopping Cart Management: Allows users to add or remove items from the cart and proceed to checkout.
- Payment Processing: Enables users to complete their purchase securely by entering payment details.
- Dynamic UI Updates: Utilizes JavaScript to dynamically update the user interface without requiring page reloads.

Technologies Used
- HTML and CSS: Used for structuring and designing the frontend, ensuring a responsive and visually appealing interface.
- JavaScript: Enhances frontend interactivity and manages user inputs.
- Express.js: A fast, unopinionated, minimalist web framework for Node.js used for handling backend logic.
- MySQL: A relational database management system used for storing product and payment data.
- PhpMyAdmin: A tool for managing MySQL databases via a web interface.

Pages
- Home (index.html): The landing page displaying products available for purchase, including an image, name, description, price, and a button to add or remove the product from the cart.
- Cart (cart.html): Shows products that have been added to the cart, allowing users to remove products and proceed to checkout.
- Payment (payment.html): Collects payment details from the user and processes the payment.

API Endpoints
- Get Products (GET /api/products): Retrieves a list of products from the database. Optional query parameter 'inCart' to filter products in the cart.
- Toggle Cart Status (POST /api/toggle-cart): Toggles the cart status of a product. Request body should include 'productId'.
- Process Payment (POST /api/payment): Processes payment using provided payment details. Request body should include 'cardNumber', 'expiryDate', 'cvv', 'cardHolder', and 'totalAmount'.


Running the Project
1- Ensure you have Node.js and npm installed on your system. You can download and install them from the Node.js website.
https://nodejs.org/

2- Install dependencies:
(Command)
npm install express body-parser mysql2

2- Start the server:
(Command)
node server.js

3- Open the application:
Navigate to http://localhost:3000 in your browser.


Conclusion
Ecommerce provides a comprehensive solution for online clothing sales, featuring a user-friendly interface, secure payment processing, and dynamic content updates. It is an ideal platform for users seeking an easy and efficient shopping experience.
