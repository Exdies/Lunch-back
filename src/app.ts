import express from "express";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import morgan from "morgan";

//initializations
const app = express();

//settings
app.set("port", 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(userRoutes);

export default app;
