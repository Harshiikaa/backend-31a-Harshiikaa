const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts', // Reference to the Cart model
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
