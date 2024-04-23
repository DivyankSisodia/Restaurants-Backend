const Food = require('../models/food.model');
const Restaurant = require('../models/restaurant.model');
const uploadOnCloudinary = require('../utils/cloudinary');
const Category = require('../models/category.model');

const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            categoryID,
            restaurantID,
            rating,
        } = req.body;

        if (!title || !description || !price || !categoryID || !restaurantID || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let foodImage;
        if (req.file) {
            const foodImageLocalPath = req.file.path;
            foodImage = await uploadOnCloudinary(foodImageLocalPath);

            if (!foodImage) {
                return res.status(500).json({
                    success: false,
                    message: "Error in uploading food image"
                });
            }
        }

        const categoryDoc = await Category.findOne({ _id: categoryID });
        const restaurantDoc = await Restaurant.findOne({ _id: restaurantID });

        if (!categoryDoc || !restaurantDoc) {
            return res.status(400).json({
                success: false,
                message: "Invalid category or restaurant"
            });
        }

        let rateCount = rating.length;

        const newFood = new Food({
            title,
            description,
            price,
            category: categoryDoc._id,
            restaurant: restaurantDoc._id,
            image: foodImage ? foodImage.secure_url : undefined,
            rating,
            ratingCount: rateCount
        });

        const savedFood = await newFood.save();
        await Restaurant.findByIdAndUpdate(
            {
                _id: restaurantID,
            },{
                $push: {
                    foods: savedFood._id
                }
            },
            { new: true }
        )

        if (!savedFood) {
            return res.status(500).json({
                success: false,
                message: "Error in saving food"
            });
        }

        // Populate the restaurant and category fields in the savedFood object
        // savedFood = await savedFood.populate({ path: 'Restaurant', options: { strictPopulate: false } }).exec();

        // const selectedCategory = await Restaurant.findById(restaurantID)
        //     .populate({
        //         path: "foods",
        //     }).exec()



        res.status(201).json({
            success: true,
            message: "Food created successfully",
            data: savedFood
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed/Error in Creating Food",
            error: error.message
        })
    }
}

module.exports = createFoodController;

