import { RequestHandler } from "express";
import User from "../models/User";
import { IUser } from "../models/User";

//obtener ordenes asociadas mediante el email y si estan activas
export const getOrders: RequestHandler = async (req, res) => {
  const orders = await User.find({ email: req.body.email });
  if (!orders) {
    return res
      .status(400)
      .json({ message: "No se registran ordenes por parte de este usuario" });
  } else {
    return res.json(orders);
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  //console.log(req.body);
  //const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (
    !req.body.name ||
    !req.body.link ||
    !req.body.details ||
    !req.body.amount ||
    !req.body.date_created ||
    !req.body.date_limit ||
    !req.body.status ||
  ) {
    return res
      .status(400)
      .json({ message: "por favor añadir todos los datos" });
  }
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound)
    return res.status(301).json({ message: "El mail registrado ya existe" });

  //const user = new User(req.body);
  const newUser = new User(req.body);
  await newUser.save();
  res.send({ message: "Usuario registrado satisfactoriamente" });
};
