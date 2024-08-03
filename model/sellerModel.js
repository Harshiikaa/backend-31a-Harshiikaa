const mongoose = require("mongoose");
const sellerSchema = mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    businessPhone: {
        type: String,
        required: true,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sellerImage: {
        type: String,
        default: null,

    },
  
});
const Sellers = mongoose.model('sellers', sellerSchema);
module.exports = Sellers;