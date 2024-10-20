import { Router } from "express";
import registerRouter from "./register.js";
import loginRouter from "./login.js";
import logoutRouter from "./logout.js";

export default async (app) => {
  const route = Router();
  app.use("/auth", route);

  loginRouter(route);
  registerRouter(route);
  logoutRouter(route);

  return route;
};
