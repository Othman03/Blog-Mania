import { Router } from "express";
import { logout } from "../../controllers/auth.js";

export default (app) => {
  const route = Router();
  app.use("/logout", route);
  route.get("/", logout);
};
