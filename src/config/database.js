const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_link = process.env.mongoDB_link;

const connectDB = async() =>{
    await mongoose.connect(mongoDB_link);
};

module.exports = connectDB;




