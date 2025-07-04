import passport from "passport";
import { userModel } from "../mongoose/schemas/userSchema.mjs";

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async(userID, done)=>{
    const findUser = await userModel.findById(userID);
    try{
        if(!findUser) throw new Error("User not found!")
        done(null, findUser);   
    }catch{(err)=>done(err, null)

    }
})