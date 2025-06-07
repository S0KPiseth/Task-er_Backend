import { Router } from "express";
import taskRoute from "./task.mjs"
import UserRoute from "./user.mjs"
const route = Router();
route.use(UserRoute);
route.use(taskRoute);
export default route;