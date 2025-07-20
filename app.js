import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import errorHandeler from "./Middlewares/errorHandeler.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.get("/", (req, res) => {
  res.send("Hello From OG Beuty Backend");
});


app.use(errorHandeler);

export default app;
