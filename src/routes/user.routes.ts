import { Router } from "express";
import { getUser, createUser } from "./user.controller";

const router = Router();

router.get("/signin", getUser);
router.post("/signup", createUser);

export default router;
