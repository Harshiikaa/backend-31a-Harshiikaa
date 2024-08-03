const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true,

    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,

    },
}
)

const Rating = mongoose.model('rating', ratingSchema);
module.exports = Rating;
