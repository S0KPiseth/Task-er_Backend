import "../helper/serializePassport.mjs"
import { Strategy } from "passport-local";
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { comparePw } from "../helper/passwordHarshing.mjs";
import passport from "passport";

export default passport.use(new Strategy(async(username, password, done)=>{
    const findUser = await userModel.findOne({username:username});
    try{
        if(!findUser) throw new Error("User not found");
        if(!comparePw(password, findUser.password)) throw new Error("Wrong password");
        done(null, findUser);
    }catch{err=>done(err, null)}
}))