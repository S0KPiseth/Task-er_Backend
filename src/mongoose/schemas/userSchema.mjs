import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
    },
    lname:{
        type:String,
        require:true,
    },
    username:{
        type: String,
        require:true,
        unique:true,
    },
    email:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
    },
})
export const userModel = mongoose.model("User", userSchema);