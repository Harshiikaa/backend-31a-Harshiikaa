const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },




});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;