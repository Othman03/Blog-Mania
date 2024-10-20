import { Router } from "express";
import { login } from "../../controllers/auth.js";


export default (app) => {

  const route = Router();
  app.use("/login", route);
  route.post("/", login);
  
  


};
