const mongoose = require("mongoose");

// importing any necessary packages 
// function (any)
// export

const connectDB = () => {
    mongoose.connect('mongodb+srv://test:test@cluster0.l5taxra.mongodb.net/').then(() => {
        console.log("Connected to Database");
    })
}

// export
module.exports = connectDB;