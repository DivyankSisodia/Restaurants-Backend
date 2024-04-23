const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: 'http://surl.li/svivr'
    }
}, {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);