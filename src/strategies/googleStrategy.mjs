import GoogleStrategy from "passport-google-oauth20"
import passport from "passport";
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { usernameGen } from "../helper/usernameGenerator.mjs";

export default passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5050/api/auth/google/redirect",
    
}, async(accessToken, refreshToken, profile, done) => {
    try{
        //check if user exist in the database
        const googleAuthenticatedUser = await userModel.findOne({"auth.googleId":profile.id})
        if(!googleAuthenticatedUser){
            const userEmail = profile.emails[0].value;
            const username = usernameGen();
        
            //if not save user to the database
            const newUser = new userModel({fname:profile.name.givenName, lname: profile.name.familyName, email:userEmail,username:username, auth:{type:"google", googleId:profile.id}})
            
            const savedUser = await newUser.save();
            return done(null, savedUser);
        }
        return done(null, googleAuthenticatedUser);

    }catch(err){
            //if random username happened to be duplicate
            if(err.code === 11000){
                newUser.username += Math.floor(Math.random()*9999)
                try{
                    await newUser.save();
                    return done(null, newUser)
                }catch(error){
                    return done(error, null)
                }
            }
            return done(err, null);
        }
    
    
    

}))