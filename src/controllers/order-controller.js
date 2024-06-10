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

        const quantity = parseInt(item.quantity, 10);

        totalQuantity += quantity;
        totalPrice += food.price * quantity;

        return {
          food: food._id,
          quantity: quantity
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

    const populatedOrder = await order.populate('foods.food').execPopulate();

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder
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

const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).populate('foods.food');

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({
      message: 'Order details fetched successfully',
      orders
    });
  } catch (error) {
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
