const products = require('../Models/Products');

class ProductController {
    async products(req, res) {
        try {
            const data = await products.find({});
            res.json(data);
        } catch (err) {}
    }
}

module.exports = new ProductController();
