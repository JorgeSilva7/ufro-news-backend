import { Router } from "express";
import { list } from "../controllers/event.controller.js";

const eventsRouter = Router();

eventsRouter.get("/events", list);

export default eventsRouter;
