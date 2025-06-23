
import { Strategy } from "passport-local";
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { comparePw } from "../helper/passwordHarshing.mjs";
import passport from "passport";


export default passport.use(new Strategy(async (username, password, done) => {
    try {
        const findUser = await userModel.findOne({
            username: username,
            "auth.type": "local"
        });

        if (!findUser) throw new Error("User not found");
        if (!comparePw(password, findUser.auth.password)) throw new Error("Wrong password");
        done(null, findUser);
    } catch (err) {
        done(err, null)
    }
}))