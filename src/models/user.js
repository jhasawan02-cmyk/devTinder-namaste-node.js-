const  mongoose  = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required:true,
        minLength:4,
        maxLength:25,
    },
    lastName : {
        type: String,
    },
    gender : {
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Invalid Gender")
            }
        },
        required:true,
    },
    password : {
        type: String,
        required:true,
    },
    email : {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    age : {
        type: Number,
        min:18,
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9wWcT-wuvBmWj1Vqb6qX-qKZGmJgvKmuMQ&s"
    },
    about:{
        type:String,
        default:"short description..."
    },
    skills:{
        type:[String],
    },
   
} ,{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports = User;