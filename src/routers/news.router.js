import { Router } from "express";
import { list, getById } from "../controllers/news.controller.js";

const newsRouter = Router();

newsRouter.get("/news", list);
newsRouter.get("/news/:newsId", getById);

export default newsRouter;
