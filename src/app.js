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

//post API for user registration
app.post("/signup", async (req, res) => {
  const addUser = new User(req.body);

  try {
    await addUser.save();
    res.send({ message: "user registered successfully" });
  } catch (err) {
    res.status(404).send({ message: "error while registering the user" });
  }
});

//get API for fetching  all users
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (err) {
    res.status(404).send("feed not found");
  }
});

  //get API for fetching user by email
  app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
      console.log(userEmail);
      const userExtract = await User.findOne({email:userEmail});
      if (!userExtract) {
        res.status(404).send("user not found");
      } else {
        res.send(userExtract);
      }
    } catch (err) {
      res.send("something went wrong while fetching the user details");
    }
  });
