import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,

    },
    email: {
        type: String,
        required: true,
    },
    username: {
            type: String,
            required:true,
            unique: true,
    },
    auth: {
        type: {
            type: String,
            required: true
        },
        password: {
            type: String,

        },
        googleId: {
            type: String,
            
        },
        discordId: {
            type: String,
            
        },
        githubId: {
            type: String,
           
        }
    },
})
export const userModel = mongoose.model("User", userSchema);