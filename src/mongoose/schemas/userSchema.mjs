import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
    tasks:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel'
        }

    ]
})
export const userModel = mongoose.model("User", userSchema);