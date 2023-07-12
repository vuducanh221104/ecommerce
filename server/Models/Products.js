const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Products = new Schema(
    {
        _id: { type: Number },
        cover_image: { type: String, maxLength: 400, require: true },
        name: { type: String, maxLength: 255, require: true },
        price: { type: String, maxLength: 255, require: true },
        price_discount: { type: String, maxLength: 255, require: true },
        prepay: { type: String, maxLength: 255, require: true },
        percent_discount: { type: String, maxLength: 255, require: true },
        product_classification: { type: String, maxLength: 255, require: true },
        image_one: { type: String, maxLength: 255 },
        image_two: { type: String, maxLength: 255 },
        image_three: { type: String, maxLength: 255 },
        image_four: { type: String, maxLength: 255 },
        image_five: { type: String, maxLength: 255 },
        amount: { type: Number, maxLength: 1, require: true },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
        slug: { type: String, slug: 'name', unique: true },
    },
    { _id: false },
);

mongoose.plugin(slug);
Products.plugin(AutoIncrement);
Products.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

// Custom query helper
Products.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isCheckType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isCheckType ? req.query.type : 'desc',
        });
    }
};

module.exports = mongoose.model('Products', Products);
