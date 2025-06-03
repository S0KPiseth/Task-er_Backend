import { Router } from "express";
import taskRoute from "./task.mjs"
const route = Router();
route.use(taskRoute);
export default route;