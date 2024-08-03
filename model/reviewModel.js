const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
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
    review: {
        type: String,
        required: true,

    },
}
)

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
