// controllers/orderController.js
const Order = require('../models/order.model');
const Food = require('../models/food.model');
const User = require('../models/user.model');

const createOrder = async (req, res) => {
  try {
    const { userId, foods } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    const orderFoods = await Promise.all(
      foods.map(async (item) => {
        const food = await Food.findById(item.food);
        if (!food) {
          throw new Error(`Food item with id ${item.food} not found`);
        }

        // Parse quantity to ensure it's a number
        const quantity = parseInt(item.quantity, 10);

        // Log to debug quantity values
        console.log(`Adding quantity: ${quantity} for food: ${item.food}`);
        totalQuantity += quantity;
        totalPrice += food.price * quantity;

        return {
          food: item.food,
          quantity: quantity
        };
      })
    );

    // Log total quantity and price for debugging
    console.log(`Total Quantity: ${totalQuantity}, Total Price: ${totalPrice}`);

    const order = new Order({
      user: userId,
      foods: orderFoods,
      totalQuantity,
      totalPrice
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ 
        message: error.message,
        error: error,
        success: false,
        statuscode: 400
    });
  }
};

module.exports = {
  createOrder
};
