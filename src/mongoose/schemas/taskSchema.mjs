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
    required: true,
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
  status:{
    type:String,
    required:true,
  }
});

export const taskModel = mongoose.model("TaskModel", taskSchema)