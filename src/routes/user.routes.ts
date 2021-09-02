import { Router } from "express";
import { getUser, createUser } from "../controllers/user.controller";
import { createOrder } from "../controllers/orders.controllers";
import passport from "passport";

const router = Router();

//router.post("/signin", getUser);
//router.post("/signup", createUser);
router.get(
  "/usermain",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(true);
  }
);

router.get(
  "/myorders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "menu para recuperar ordenes" });
  }
);

router.post(
  "/createorder",
  passport.authenticate("jwt", { session: false }),
  createOrder
);

export default router;
