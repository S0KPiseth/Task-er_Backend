import DiscordStrategy from "passport-discord"
import passport from "passport"
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { usernameGen } from "../helper/usernameGenerator.mjs";

export default passport.use(new DiscordStrategy({
    clientID:process.env.DISCORD_ID,
    clientSecret:process.env.DISCORD_SECRET,
    callbackURL:"http://localhost:5050/api/auth/discord/redirect",
    scope:["identify", "email"]
},async(accessToken, refreshToken, profile, done)=>{
    const findUser = await userModel.findOne({"auth.discordId": profile.id})

    if(!findUser){
        const newUser = new userModel({
            fname: profile.global_name,
            email:profile.email,
            username: usernameGen(),
            auth:{
                type:"discord",
                discordId: profile.id,
            }
        });
        try{
           
            await newUser.save();
            return done(null, newUser);
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
    }
    return done(null, findUser)
}))