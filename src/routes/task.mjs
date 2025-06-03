import {Router } from "express";
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { taskModel } from "../mongoose/schemas/taskSchema.mjs";
import { validateTask } from "../utils/ValidatorSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
const route = Router();
//To-DO config the end point properly for both authenticated user and guest user
route.put("/api/task", checkSchema(validateTask),async (request, response)=>{
    const result = validationResult(request);
    if(result.isEmpty()){
        const data = matchedData(request);
        const newTask = new taskModel(data);
        if(request.user){
            const updateUser = userModel.findByIdAndUpdate(request.user._id,{tasks:[...request.user.tasks, newTask]});
            try{
                await newTask.save();
            }catch(err){
                response.status(400).send({msg:err.errorResponse.errmsg})
            }
            return response.sendStatus(200).send({task:newTask});
        }
        if(!request.session.tasks){
            request.session.tasks=[newTask];
        }else{request.session.tasks.push(newTask)};
        return response.status(200).send({task:newTask});
    }else{
        console.log(result.array()[0])
        response.status(400).send({msg:result.array()[0].msg});
    }
    

})
export default route;