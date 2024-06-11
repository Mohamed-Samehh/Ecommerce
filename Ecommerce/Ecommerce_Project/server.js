const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database...');
});

app.get('/api/products', (req, res) => {
    const inCart = req.query.inCart;
    let sql = 'SELECT id, name, description, price, image, inCart FROM products';
    if (inCart) {
        sql += ' WHERE inCart = 1';
    }
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ success: false, message: 'Error fetching products' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        results.forEach(product => {
            if (product.image) {
                product.image = product.image.toString('base64');
            } else {
                product.image = null;
            }
        });
        res.json(results);
    });
});

app.post('/api/toggle-cart', (req, res) => {
    const { productId } = req.body;
    const getStatusSql = 'SELECT inCart FROM products WHERE id = ?';
    db.query(getStatusSql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product status:', err);
            return res.status(500).json({ success: false, message: 'Error fetching product status' });
        }
        if (results.length > 0) {
            const currentStatus = results[0].inCart;
            const newStatus = currentStatus ? 0 : 1;
            const updateSql = 'UPDATE products SET inCart = ? WHERE id = ?';
            db.query(updateSql, [newStatus, productId], (err, result) => {
                if (err) {
                    console.error('Error updating product status:', err);
                    return res.status(500).json({ success: false, message: 'Error updating product status' });
                }
                res.json({ success: true, inCart: newStatus });
            });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    });
});

app.post('/api/payment', (req, res) => {
    const { cardNumber, expiryDate, cvv, cardHolder, totalAmount } = req.body;
    const sql = 'INSERT INTO payments (cardNumber, expiryDate, cvv, cardHolder, totalAmount) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [cardNumber, expiryDate, cvv, cardHolder, totalAmount], (err, result) => {
        if (err) {
            console.error('Error processing payment:', err);
            return res.status(500).json({ success: false, message: 'Payment processing failed' });
        }
        
        const updateProductsSql = 'UPDATE products SET inCart = 0 WHERE inCart = 1';
        db.query(updateProductsSql, (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating product status after payment:', updateErr);
                return res.status(500).json({ success: false, message: 'Error updating product status after payment' });
            }
            console.log('Products updated after payment:', updateResult);
            res.json({ success: true });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
