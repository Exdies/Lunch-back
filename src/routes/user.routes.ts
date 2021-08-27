import { Router } from "express";
import { getUser, createUser } from "../controllers/user.controller";
import passport from "passport";

const router = Router();

//router.post("/signin", getUser);
//router.post("/signup", createUser);
router.get(
  "/usermain",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("exito en ingresar a pagina de usuario con passport y jwt");
  }
);

router.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "menu para recuperar ordenes" });
  }
);
export default router;
