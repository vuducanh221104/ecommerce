const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductController');

router.get('/product/:slug', productController.slugProducts);
router.get('/product', productController.products);
router.get('/users/search', productController.Apiqandtype);

module.exports = router;
