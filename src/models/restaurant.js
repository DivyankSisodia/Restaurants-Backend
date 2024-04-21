const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required'],
        },
        imageUrl:{
            type: String,
            required: [true, 'Image is required'],
        },
        foods: {
            type: Array,
        },
        time :{
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 5,
        },
        ratingCount:{
            type: String,
        },
        pickUp: {
            type: Boolean,
            required: true,
        },
        delivery: {
            type: Boolean,
            required: true,
        },
        isOpen:{
            type: Boolean,
            default: true,
        },
        address:{
            type: String,
            required: true,
        }
    }, 
{timestamps: true});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);