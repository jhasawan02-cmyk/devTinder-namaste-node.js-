const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://skj138265_db_user:A3WHqBi8pSU1gsnU@namastenodejs.dsbjzxz.mongodb.net/devTinder");
};

module.exports = connectDB;




