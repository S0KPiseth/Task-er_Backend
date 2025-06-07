import express from "express"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { checkSchema, validationResult, matchedData, body } from "express-validator";
import { userValidatorSchema } from "./utils/ValidatorSchemas.mjs";
import { userModel } from "./mongoose/schemas/userSchema.mjs";
import { harshPw } from "./helper/passwordHarshing.mjs";
import "./strategies/localStrategy.mjs"
import passport from "passport";
import cors from "cors"
import route from "./routes/index.mjs";

const app = express();
const PORT = 5050;
//TO-DO handle the task when user is not authenticated (where to store it)
//connect to the database
mongoose.connect("mongodb://127.0.0.1/Tasker").then(()=>console.log("connected to the database"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("something Secret"))
app.use(session({
    secret:"tungtung",
    saveUninitialized:false,
    resave:false,
    rolling:true,
    cookie:{
        maxAge: 60000*30
    },
    store:new MongoStore({client:mongoose.connection.getClient()})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin:"http://localhost:8888",
    credentials: true 
}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8888");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(route)
app.get("/",(request, response)=>{
    response.status(200).send({msg:"hi"});
})
app.post("/api/auth/", passport.authenticate('local'), (request, response)=>{

   
    const safeUser = {
        _id: request.user._id,
        email: request.user.email,
        username: request.user.username,
    };
    response.status(200).send({user:safeUser,redirectUrl:"/"})

})
app.get("/api/auth/status", (request, response)=>{
    if(request.user){
        const safeUser = {
            _id: request.user._id,
            email: request.user.email,
            name: request.user.name,
            tasks: request.user.tasks,
        };
        return response.status(200).send({user:safeUser});

    }
    if(!request.session.tasks){
        request.session.tasks = []
    }
    return response.status(200).send({isAuthenticated:false,tasks:request.session.tasks})
})
app.post("/api/auth/register", checkSchema(userValidatorSchema), async (request, response)=>{
    const result = validationResult(request);
    if(result.isEmpty()){
        const data = matchedData(request);
        data.password = harshPw(data.password)
        const newUser = new userModel(data);
        try{
            await newUser.save();
            response.status(201).send({redirectUrl:"/auth"})
        }catch(err){
            response.status(400).send({msg:err.errorResponse.errmsg})
        }

    }else{
        response.status(400).send({msg:result.array()[0].msg});
    }

})




app.listen(PORT, ()=>{
    console.log("server start")
})