const Order = require('../models/order.model');
const Food = require('../models/food.model');
const User = require('../models/user.model');

const createOrder = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body for debugging

    const { userId, foods } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if foods array is provided
    if (!foods || !Array.isArray(foods) || foods.length === 0) {
      return res.status(400).json({ message: 'Foods are required and must be an array' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    const foodItems = await Promise.all(foods.map(async food => {
      const foodItem = await Food.findById(food.food); // Correctly access the food ID
      if (!foodItem) {
        throw new Error(`Food item with ID ${food.food} not found`);
      }
      totalQuantity += food.quantity;
      totalPrice += foodItem.price * food.quantity;
      return {
        food: food.food, // Correctly set the food ID
        quantity: food.quantity
      };
    }));

    const newOrder = new Order({
      user: userId,
      foods: foodItems,
      totalQuantity,
      totalPrice
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);  // Log the error for debugging
    res.status(400).json({ 
      message: error.message,
      error: error,
      success: false,
      statuscode: 400
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const orders = await Order.find({ user: userId }).populate('foods.food');

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({
      message: 'Order details fetched successfully',
      orders
    });
  } catch (error) {
    console.error('Error fetching order details:', error);  // Log the error for debugging
    res.status(500).json({ 
      message: 'Failed to fetch order details',
      error: error,
      success: false,
      statuscode: 500
    });
  }
};

module.exports = {
  createOrder,
  getOrderDetails
};
