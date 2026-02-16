const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());

connectDB()
  .then(() => {
    console.log("successfully connected to the database cluster");

    app.listen(8080, () => {
      console.log(`server is running and listening from port : 8080`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:");
    console.log(err);
  });



app.post("/register",async (req, res) => {
   const user =  new User({
        firstName:"sachin",
        lastName: "tendulkar",
        gender: "male",
        password: "sachin@123",
        email: "sachin@tendulkar@gmail.com",
        age: 55,
    });

    try{
    await user.save();
    res.send({"message":"user registered successfully"});
    }catch(err){
        res.status(404).send({"message":"error while registering the user"});
    }
})



