import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: [
    {
      tagname: { type: String, required: true },
      color: { type: String, required: true },
      textColor: { type: String, required: true },
    }
  ],
  dueDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  priorityChoice: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  boardId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board'
    
  },
  status:{
    type:String,
  },
  boardName:{
    type:String,
    default:"To Do"
  }
});

export const taskModel = mongoose.model("TaskModel", taskSchema)