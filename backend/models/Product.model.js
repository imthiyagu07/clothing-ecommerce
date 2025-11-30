import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Please provide product image']
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['Men', 'Women', 'Kids', 'Unisex']
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }],
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;