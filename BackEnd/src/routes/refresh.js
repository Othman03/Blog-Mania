import { Router } from "express";
import refreshToken from "../controllers/refresh.js";

export const refreshRoute = async (app) => {
  const route = Router();

  app.use("/refresh", route);

  route.get("/", refreshToken);
};
