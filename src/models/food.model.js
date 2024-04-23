const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Ensure that this matches the model name
        required: true
    },
    image: {
        type: String,
        default: 'http://surl.li/swbow'
    },
    rating: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
