import { Router } from "express";
import { validateTask } from "../utils/ValidatorSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { userModel } from "../mongoose/schemas/userSchema.mjs";
import { taskModel } from "../mongoose/schemas/taskSchema.mjs";
const router = Router();

router.get("/api/user/task", async(request, response) => {
  let tasksToResponse = []
  try{
    for (const id of request.user.tasks){
      const findTask = await taskModel.findById(id);
      tasksToResponse.push(findTask);
    }
  }catch(err){console.log(err)}
  
  return response.status(200).send({ tasks: tasksToResponse})})
export default router