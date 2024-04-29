const uploadOnCloudinary = require("../utils/cloudinary");
const Restaurant = require("../models/restaurant.model");
const createRestaurantController = async (req, res) => {
    try {
        const { title, foods, time, rating, pickUp, delivery, isOpen, address } = req.body;
        console.log(req.body);

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Please provide text fields'
            });
        }

        const restaurantImageLocalPath = req.file.path;

        console.log('restaurantImageLocalPath', restaurantImageLocalPath)

        const restaurantImage = await uploadOnCloudinary(restaurantImageLocalPath);

        if (!restaurantImage) {
            return res.status(500).json({
                success: false,
                message: 'Error in uploading restaurant image'
            });
        }

        const restaurant = new Restaurant({
            title,
            imageUrl: restaurantImage.secure_url,
            foods,
            time,
            rating,
            pickUp,
            delivery,
            isOpen,
            address
        });

        const result = await restaurant.save();

        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'Error in saving restaurant'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

// get all restaurants

const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({})
            .populate({
                path: "foods"
            }).exec()
        if (!restaurants) {
            return res.status(404).json({
                success: false,
                message: 'No restaurant found'
            });
        }
        res.status(200).json({
            success: true,
            totalCount: restaurants.length,
            message: 'All restaurants',
            data: restaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get all restaurants',
            error: error.message
        })
    }
}

// get restaurant by id

const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurant ID",
            });
        }
        //find restaurant
        const restaurant = await Restaurant.findById(restaurantId)
            .populate({
                path: "foods"
            }).exec()
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "no restaurant found",
            });
        }
        res.status(200).send({
            success: true,
            foodCount: restaurant.foods.length,
            message: "Restaurant found successfully",
            restaurant: restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Restaurant by id api",
            error,
        });
    }
};

const deleteRestaurantController = async (req, res) => {
    try {
        const result = req.params.id;
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurant ID",
            });
        }
        //find restaurant
        const restaurant = await Restaurant.findByIdAndDelete(result);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "no restaurant found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in deleting restaurant',
            error: error.message
        });
    }
};

const updateRestaurantController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, time, rating, pickUp, delivery, isOpen, address } = req.body;

        console.log('id', id);

        const updateRestaurantDetails = await Restaurant.findByIdAndUpdate(id, { title, time, rating, pickUp, delivery, isOpen, address }, { new: true });

        if (!updateRestaurantDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: updateRestaurantDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in updating restaurant',
            error: error.message
        });
    }
}


module.exports = { createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController, updateRestaurantController };