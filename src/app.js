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
    res.status(400).send({ message: "error while registering the user" });
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
    res.status(500).send("something went wrong while fetching the user details");
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
app.put("/update", async (req, res) => {
  const useremail = req.body.email;
  try {
    if (!useremail) {
      res.send("need correct user email to update the user details");
    } else {
      const updateduser = await User.findOneAndUpdate(
        { email: useremail },
        req.body,
        { new: true },
      );
      if (!updateduser) {
        res.status(404).send("user not found");
      } else {
        res.send({ message: "user details updated successfully", user: updateduser });
      }
    }
  } catch (err) {
    res
      .status(404)
      .send("something went wrong while updating the user details");
  }
});

//Api to patch the user details via email using "findOneAndReplace"
app.patch('/user', async(req,res) => {
  const useremail = req.body.email;

  try{
    if(!useremail){
      res.send("need correct user email to correct/update the individual data")
    }else{
      const patchUser  = await User.findOneAndUpdate(
        {email : useremail},
        {age: req.body.age},
        {skills:req.body.skills,password:req.body.passwo,about:req.body.about},
        {new:true, runValidators:true},
      );
      if (!patchUser) {
        res.status(404).send("user not found");
      } else {
        res.send({ message: "user data updated", user: patchUser });
      }
    }
  }
  catch(err){
    res.status(500).send("update failed: " + err.message);
  }
});
