const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_link = process.env.MONGODB_LINK;

const connectDB = async() =>{
    console.log("Loaded URI:", process.env.MONGODB_LINK);
    await mongoose.connect((mongoDB_link));


};

module.exports = connectDB;




