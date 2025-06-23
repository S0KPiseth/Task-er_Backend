import { Router } from "express";
import taskRoute from "./task.mjs"
import UserRoute from "./user.mjs"
import boardRoute from "./board.mjs"
const route = Router();
route.use(UserRoute);
route.use(taskRoute);
route.use(boardRoute);
export default route;