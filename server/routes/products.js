const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductController');

router.get('/product', productController.products);

module.exports = router;
