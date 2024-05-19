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
            }, {
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

const getAllFoodController = async (req, res) => {
    try {
        const foods = await Food.find({})
            .populate({
                path: 'restaurant',
                select: 'title'
            })
            .exec();

        if (!foods) {
            return res.status(404).json({
                success: false,
                message: "No food found"
            });
        }

        res.status(200).json({
            success: true,
            totalCount: foods.length,
            message: "All Foods",
            data: foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(400).json({
                success: false,
                message: "Food ID is required"
            });
        }

        const food = await Food.findOne({ _id: foodId });

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Single Food",
            data: food
        });

    } catch (error) {
        re.status(500).json({
            success: false,
            message: "Error while getting single food",
            error: error.message
        });
    }
}

const searchFoodController = async (req, res) => {
    try {
        const key = req.params.key;
        console.log(key);

        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Key is required"
            });
        }

        if (key.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Key must be at least 3 characters"
            });
        }

        // Convert the key to lowercase before using it in the regex
        const search = await Food.find({
            "$or": [
                { "title": { $regex: new RegExp(req.params.key, 'i') } }, // 'i' flag for case-insensitive
            ]
        });

        if (search.length === 0) { // check if search result is empty
            return res.status(404).json({
                success: false,
                message: "No food found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All Foods",
            data: search
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in API",
            error: error.message
        });
    }
}


module.exports = { createFoodController, getAllFoodController, getSingleFoodController, searchFoodController };

