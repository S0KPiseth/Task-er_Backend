import { Router } from "express";
import { boardModel } from "../mongoose/schemas/boardSchema.mjs";

const route = Router();

route.get("/api/board", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  try {
    const findBoard = await boardModel.find({ userID: req.user._id });
    return res.status(200).send({ boards: findBoard });
  } catch (err) {
    console.error("Error fetching boards:", err);
    return res.status(500).send({ msg: "Failed to fetch boards" });
  }
});

route.post("/api/board/default", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const defaultBoard = ["To Do", "Doing", "Done"];
  const resBoard = [];

  try {
    for (let name of defaultBoard) {
      const newBoard = new boardModel({ name, userID: req.user._id });
      await newBoard.save();
      resBoard.push(newBoard);
    }
    return res.status(200).send({ boardList: resBoard });
  } catch (err) {
    console.error("Error creating default boards:", err);
    return res.status(400).send({ msg: err?.message || "Board creation failed" });
  }
});

route.post("/api/board", async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  const { name } = req.body;

  try {
    const newBoard = new boardModel({ name, userID: req.user._id });
    await newBoard.save();
    return res.status(200).send({ board: newBoard });
  } catch (err) {
    console.error("Error creating board:", err);
    return res.status(400).send({ msg: err?.message || "Board creation failed" });
  }
});

export default route;
