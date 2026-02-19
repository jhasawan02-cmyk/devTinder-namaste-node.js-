const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
app.use(express.json());
const validator = require("validator");
const { validateSignup } = require("./utils/validators");
const bcrypt = require("bcrypt");


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
  // Validate email, password, and photoUrl
  if (!validateSignup(req, res)) {
    return;
  }

  const{email, firstName, lastName,password,age,gender, skills, about , photoUrl} = req.body
 
  //encrypting user password
  const PasswordHash = await bcrypt.hash(password,10)

//adding encrypted password into DB
   const addUser = new User({
    age,gender, skills, about , photoUrl, email,firstName,lastName,password:PasswordHash,
   });


  try {
    await addUser.save();
    res.send({ message: "user registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(400)
        .send({
          message: "Email already exists",
          error: "This email is already registered",
        });
    } else {
      res
        .status(400)
        .send({
          message: "error while registering the user",
          error: err.message,
        });
    }
  }
});

//get API for fetching  all users
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (err) {
    res.status(500).send("feed not found");
  }
});

//get API for fetching user by email
app.get("/userData", async (req, res) => {
  const userEmail = req.query.email;
  try {
    console.log(userEmail);
    const userExtract = await User.findOne({ email: userEmail });
    if (!userExtract) {
      res.status(404).send("user not found");
    } else {
      res.send(userExtract);
    }
  } catch (err) {
    res
      .status(500)
      .send("something went wrong while fetching the user details");
  }
});

//delete API for deleting user by id
app.delete("/delete", async (req, res) => {
  const userId = req.body.id;
  try {
    const deleteUser = await User.findOneAndDelete({ _id: userId });
    if (!deleteUser) {
      res.status(404).send("user not found");
    } else {
      res.send({ message: "user deleted successfully" });
    }
  } catch (err) {
    res.status(500).send("something went wrong while deleting the user");
  }
});

//APi to update the user data
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const ALLOWED_UPDATES = [
    "age",
    "password",
    "skills",
    "about",
    "firstName",
    "lastName",
    "gender",
    "photoUrl",
  ];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed || data.skills.length > 4) {
      res.status(400).send("update not allowed(max.4 skills)");
      return;
    }

    if (!userId) {
      res.status(400).send("need correct user id to update the user details");
    } else {
      const updateduser = await User.findOneAndUpdate({ _id: userId }, data, {
        new: true,
        runValidators: true,
      });
      if (!updateduser) {
        res.status(404).send("user not found");
      } else {
        res.send({
          message: "user details updated successfully",
          user: updateduser,
        });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send(
        "something went wrong while updating the user details: " + err.message,
      );
  }
});
