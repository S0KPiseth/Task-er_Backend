import githubStrategy from "passport-github"
import passport from "passport"
import { usernameGen } from "../helper/usernameGenerator.mjs"
import { userModel } from "../mongoose/schemas/userSchema.mjs"
//facebook is not return the data that we need so need to research more about this
export default passport.use(new githubStrategy({
  clientID: process.env.GITHUB_APP_ID,
  clientSecret: process.env.GITHUB_APP_SECRET,
  callbackURL: "http://localhost:5050/api/auth/github/redirect",
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  const findUser = await userModel.findOne({ "auth.githubId": profile.id })

  //save user info if the user not found
  const username = usernameGen();
  if (!findUser) {
  
    const user = { fname: profile.displayName, email: profile.emails[0].value, username, auth: { type: "github", githubId: profile.id } }
    const newUser = new userModel(user);
    try {
      await newUser.save()
      return done(null, newUser);
    } catch(err){
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
