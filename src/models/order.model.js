// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalQuantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
    status: {
        type: String,
        enum: ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'],
        default: 'Order Placed'
    },
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
