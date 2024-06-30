## Setting Up Database Server: WampServer with PhpMyAdmin (MySQL)

1. **Run WampServer and Access PhpMyAdmin:**
   - Start WampServer.
   - Access PhpMyAdmin from WampServer.

2. **Login to PhpMyAdmin:**
   - Use Username `"root"` and leave the Password field empty.
   - Make sure Server choice is set to `"MySQL"`.

3. **Create Database:**
   - Create a new database named `"ecommerce"` in PhpMyAdmin.

4. **Import Database File:**
   - Click on the `"Import"` tab in PhpMyAdmin.
   - Choose the file named `"ecommerce.sql"` from the `"Data"` folder.
   - Execute the import to populate the `"ecommerce"` database.

5. **Ensure Node.js and npm Installation:**
   - Ensure you have Node.js and npm installed on your system. You can download and install them from the [Node.js website](https://nodejs.org/).

6. **Set Up Ecommerce Project:**
   - Open the folder `"Ecommerce_Project"` in Visual Studio Code.
   - Open a new terminal and run `npm install express body-parser mysql2` to install the necessary dependencies.
   - After the installation is complete, start the Express.js server by running `node server.js`.

7. **Access Your Project:**
   - To run the project, open your web browser.
   - Enter the URL: [http://localhost:3000](http://localhost:3000).
