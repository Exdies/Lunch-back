import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import userRoutes from "./routes/user.routes";

//initializations
const app = express();

//settings
app.set("port", 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passport.use(passportMiddleware);

//routes
app.use(authRoutes);
app.use(userRoutes);

export default app;
