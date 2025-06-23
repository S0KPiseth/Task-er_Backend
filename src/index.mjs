import express from "express"
import mongoose from "mongoose";
import "dotenv"
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import {
    checkSchema,
    validationResult,
    matchedData,
    body
} from "express-validator";
import {
    userValidatorSchema
} from "./utils/ValidatorSchemas.mjs";
import {
    userModel
} from "./mongoose/schemas/userSchema.mjs";
import {
    harshPw
} from "./helper/passwordHarshing.mjs";
import "./helper/serializePassport.mjs"
import "./strategies/localStrategy.mjs"
import "./strategies/googleStrategy.mjs"
import "./strategies/discordStrategy.mjs"
import "./strategies/githubStrategy.mjs"
import passport from "passport";
import cors from "cors"
import route from "./routes/index.mjs";



const app = express();
const PORT = process.env.SERVER_PORT;

//connect to the database
mongoose.connect("mongodb://127.0.0.1/Tasker", {autoIndex: true}).then(() => console.log("connected to the database"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser("something Secret"))
app.use(session({
    secret: "tungtung",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: 60000 * 30
    },
    store: new MongoStore({
        client: mongoose.connection.getClient()
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: "http://localhost:8888",
    credentials: true
}))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8888");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(route)
app.get("/", (request, response) => {
    response.status(200).send({
        msg: "hi"
    });
})
app.post("/api/auth", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
       
        if (err) return res.status(400).send({ msg: err.message });
        if (!user) return res.status(401).send({ msg: "Authentication failed" });

        req.logIn(user, (err) => {
            if (err) return res.status(500).send({ msg: "Login failed" });
            return res.status(200).send({ redirectUrl: "/" });
        });
    })(req, res, next);
});

app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
app.get("/api/auth/google/redirect", (req, res, next) => {
    passport.authenticate("google", (err, user) => {

        if (err) return res.status(400).send({
            msg: err.message
        });
        if (!user) return res.status(401).send({
            msg: "Authentication failed"
        });
        req.logIn(user, (err) => {
            if (err) return res.status(500).send({ msg: "Login failed" });
            res.redirect("http://localhost:8888/");
        });
    })(req, res, next);
})
app.get("/api/auth/discord", passport.authenticate("discord"))
app.get("/api/auth/discord/redirect", (req, res, next) => {
    passport.authenticate("discord", (err, user) => {

        if (err) return res.status(400).send({
            msg: err.message
        });
        if (!user) return res.status(401).send({
            msg: "Authentication failed"
        });
        req.logIn(user, (err) => {
            if (err) return res.status(500).send({ msg: "Login failed" });
            res.redirect("http://localhost:8888/");
        });
    })(req, res, next);
})

app.get("/api/auth/github", passport.authenticate("github"))
app.get("/api/auth/github/redirect", (req, res, next) => {
    passport.authenticate("github", (err, user) => {

        if (err) return res.status(400).send({
            msg: err.message
        });
        if (!user) return res.status(401).send({
            msg: "Authentication failed"
        });
        req.logIn(user, (err) => {
            if(err) console.log(err)
            if (err) return res.status(500).send({ msg: "Login failed" });
            res.redirect("http://localhost:8888/");
        });
    })(req, res, next);
})

























app.get("/api/auth/me", (req, res) => {
    if (req.user) {
        const safeUser = {
            _id: req.user._id,
            fname: req.user.fname,
            lname: req.user.lname,
            email: req.user.email,
            username: req.user.username,
            type: req.user.auth.type
        };
        return res.status(200).send({ isAuth: true, user: safeUser })
    }
    return res.status(200).send({ isAuth: false })
})

app.get('/api/auth/logout', (req, res, next) => {
  req.logout((err) =>{
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid'); 
    return res.sendStatus(200);
  });
});
app.post("/api/auth/register", checkSchema(userValidatorSchema), async (request, response) => {
    const result = validationResult(request);
    if (result.isEmpty()) {
        const data = matchedData(request);
        data.password = harshPw(data.password)

        const newUserData = {

            fname: data.fname,
            lname: data.lname,
            email: data.email,
            username: data.username,
            auth: {
                type: "local",
                password: data.password
            }
        };
        const newUser = new userModel(newUserData);
        try {
            await newUser.save();
            response.status(201).send({
                redirectUrl: "/auth"
            })
        } catch (err) {
            response.status(400).send({
                msg: err.errorResponse.errmsg
            })
        }

    } else {
        response.status(400).send({
            msg: result.array()[0].msg
        });
    }

})




app.listen(PORT, () => {
    console.log("server start")
})
