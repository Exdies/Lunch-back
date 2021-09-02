import { Router } from "express";
import {
  getUser,
  createUser,
  getUserBoolean,
} from "../controllers/user.controller";

const router = Router();

//login
router.post("/signin", getUser);
//login with not jwt return directy
router.post("/signin2", getUserBoolean);
router.post("/signup", createUser);

router.get("/logout");

export default router;
