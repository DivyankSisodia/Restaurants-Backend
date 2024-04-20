const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'user password is required']
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'user phone is required']
    },
    userType: {
        type: String,
        required: [true, 'user type is required'],
        default: 'customer',
        enum: ['customer', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
    }
}, {timestamps: true})

const user = mongoose.model('user', userSchema);

module.exports = user;