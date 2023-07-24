const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const ProductsDetails = new Schema(
    {
        _id: { type: Number },
        cover_image: { type: String, maxLength: 400, require: true },
        name: { type: String, maxLength: 255, require: true },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
        slug: { type: String, slug: 'name', unique: true },
    },
    { _id: false },
);

mongoose.plugin(slug);

module.exports = mongoose.model('product-details', ProductsDetails);
