const mongoose = require("mongoose")

const favoriteSchema = mongoose.Schema({
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
})

const Favorites = mongoose.model('favorites', favoriteSchema);
module.exports = Favorites;
