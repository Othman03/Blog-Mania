import { Router } from "express";

import authRouter from "./auth/index.js";
import blogsRouter from "./blogs.js";
import jwtVerifier from "./middlewares/jwtVerifier.js";

export default function () {
  const app = Router();

  authRouter(app);
  app.use(jwtVerifier);
  blogsRouter(app);
  return app;
}
