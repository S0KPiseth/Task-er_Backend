import { Router } from "express";
import { taskModel } from "../mongoose/schemas/taskSchema.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { validateTask } from "../utils/ValidatorSchemas.mjs";
import { boardModel } from "../mongoose/schemas/boardSchema.mjs";


const route = Router();
route.get("/api/task", async (req, res) => {
  if (req.user) {
    const findTask = await taskModel.find({ userId: req.user._id });
    if (findTask) {
      return res.status(200).send([...findTask]);
    }
    return res.status(200).send([]);
  }
})
route.post("/api/task", checkSchema(validateTask), async (request, response) => {
  const result = validationResult(request);

  if (result.isEmpty()) {
    const data = matchedData(request);
    const newTask = new taskModel(data);
    if (request.user) {
      try {
        await newTask.save();
      } catch (err) {
        console.log(err)
        response.status(400).send({ msg: err.errorResponse.errmsg });
      }
      return response.status(200).send({ task: newTask });
    }
    return response.status(200).send({ task: newTask });
  } else {
    response.status(400).send({ msg: result.array()[0].msg });
  }
});
route.put("/api/task", checkSchema(validateTask), async (request, response) => {
  const result = validationResult(request);
  if (result.isEmpty()) {
    const data = matchedData(request,{ includeOptionals: true });
 
    if(data.boardName==="Done"){ data.status="Complete"} else if (data.status!="Over Due"){data.status="In progress"}
    const updateTask = await taskModel.findOneAndUpdate({ _id: data.idx }, { $set: data }, { new: true })

    return response.status(201).send({ task: updateTask });
  }
  return response.status(400).send({ msg: result.array()[0].msg });
})
route.put("/api/task/:id", async (request, response) => {
  const { params: { id } } = request;
  const userBoard = await boardModel.find({userID:request.user._id})
  const doneBoard = userBoard.find(e=>e.name==="Done")
  const now = new Date();
  const updateTask = await taskModel.findOneAndUpdate({ _id: id }, { status: "Complete", boardName:"Done", boardId:doneBoard._id, dueDate:null, completedDate: now}, { new: true })

  return response.status(201).send({ task: updateTask });
})
route.delete("/api/task/:id", async (req, res) => {
  const { params: { id } } = req;
  try {
    await taskModel.findByIdAndDelete(id);
    return res.sendStatus(204);

  } catch (err) {
    return res.status(400).send({ msg: err })

  }
})

export default route;
