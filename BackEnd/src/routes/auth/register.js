import { Router } from "express";
import { register } from "../../controllers/auth.js";

export default (app) => {
  const route = Router();
  app.use("/register", route);
  route.post("/", register);
};
