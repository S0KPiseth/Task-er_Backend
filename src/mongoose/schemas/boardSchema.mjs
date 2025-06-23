import mongoose from "mongoose";

const boardSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
    }
)
boardSchema.index({
    name:1,
    userID:1,

}, {unique:true})

export const boardModel = mongoose.model("board", boardSchema);