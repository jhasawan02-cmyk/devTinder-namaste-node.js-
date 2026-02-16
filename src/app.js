const express = require("express");
const app = express();
const connectDB = require("./config/database");




app.get("/",(req,res)=>{
    res.send("welcome to the home page of dev tinder");
});

connectDB()
  .then(() => {
    console.log("succesfully connected to the dadabase cluster");

    app.listen(8080, () => {
      console.log(`server is running and  listening from port : 8080`);
    });
  })
  .catch(() => {
    console.log("error while connecting with the database cluster");
  });
