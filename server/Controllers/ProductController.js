const products = require('../Models/Products');
const productDetails = require('../Models/ProductsDetails');
class ProductController {
    async products(req, res) {
        try {
            const data = await products.find({});
            res.json(data);
        } catch (err) {}
    }

    // [GET] : API?q=''&type=less
    async Apiqandtype(req, res, next) {
        const { q, type } = req.query;
        let query = {};
        if (q) {
            query = { name: { $regex: q, $options: 'i' } }; // Tìm kiếm theo trường 'name' với từ khóa q
        }
        if (type === 'more') {
            // Lấy nhiều kết quả
            const users = await products.find(query);
            res.json(users);
        } else {
            // Lấy ít kết quả
            const users = await products.find(query).limit(7); // Giới hạn số lượng kết quả là 10
            res.json(users);
        }
    }

    async slugProducts(req, res, next) {
        try {
            const slug = req.params.slug; // Lấy giá trị slug từ URL params

            const productDetail = await productDetails.findOne({ slug }); // Tìm tài liệu dựa trên trường "slug"

            if (!productDetail) {
                return res.status(404).json({ message: 'Tài liệu không tồn tại' });
            }

            res.json(productDetail); // Gửi tài liệu dưới dạng JSON
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProductController();
