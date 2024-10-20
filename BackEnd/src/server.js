import express from "express";
import indexRouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", indexRouter());

app.listen(8090, () => {
  console.log("hello from Othman");
});
