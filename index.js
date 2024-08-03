// importing express
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require('cors');
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary');
// const mongoose = require("mongoose");
// instances of express or making express app
const app = express();

const Product = require('./model/productModel');

// dot env config
dotenv.config();


// cors policy 
const corsPolicy = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200

}
app.use(cors(corsPolicy))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// multiplarty middle ware 
app.use(multiparty())
connectDB();


// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// json middleware (to accept json data )
app.use(express.json());


// define port
const PORT = process.env.PORT;


// api/user static route deko confuse na hoss vanera
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/seller', require('./routes/sellerRoutes'))
app.use('/api/product', require('./routes/productsRoutes'))
app.use('/api/favorite', require('./routes/favoritesRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))
app.use('/api/rating', require('./routes/ratingRoutes'))
app.use('/api/review', require('./routes/reviewRoutes'))
app.use('/api/order', require('./routes/orderRoutes'))




//run the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

})

// test route
app.get('/test', (req, res) => {
    res.send("hello from express server")
})



module.exports = app;