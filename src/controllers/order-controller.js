// controllers/orderController.js
const Order = require('../models/order.model');
const Food = require('../models/food.model');
const User = require('../models/user.model');

const createOrder = async (req, res) => {
  try {
    const { userId, foods } = req.body;

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

        totalQuantity += item.quantity;
        totalPrice += food.price * item.quantity;

        return {
          food: item.food,
          quantity: item.quantity
        };
      })
    );

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
        sucess: false,
        statuscode: 400
    });
  }
};

module.exports = {
  createOrder
};
