const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required'],
        },
        imageUrl:{
            type: String,
        },
        foods: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
        }],
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
            default: true,
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

module.exports = Restaurant;