import { RequestHandler } from "express";
import User from "../models/User";
import { IUser } from "../models/User";
import Order from "../models/Orders";

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
  //console.log(req.user);
  //id del usuario identificado
  const user = req.user;
  const body = req.body;
  console.log(user);
  //const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userFound = await User.findById(req.user);
  if (userFound) {
    console.log(
      "el usuario identificado en el token es: " + userFound.firstName
    );
    req.body["owner"] = userFound._id;
  }
  console.log(req.body);

  if (
    !body.owner ||
    !body.name ||
    !body.link ||
    !body.details ||
    !body.amount ||
    !body.date_created ||
    !body.date_limit ||
    !body.status
  ) {
    return res
      .status(400)
      .json({ message: "por favor añadir todos los datos" });
  } else {
    const order = new Order({
      owner: body.owner,
      name: body.name,
      link: body.link,
      details: body.details,
      amount: body.amount,
      date_created: body.date_created,
      date_limit: body.date_limit,
      status: body.status,
    });
    const savedOrder = await order.save();
    if (userFound) {
      console.log(userFound);
      console.log(savedOrder._id);
      userFound.orders = userFound.orders.concat(savedOrder._id);
      await userFound.save();
    }
    return res.status(200).json({ message: "todos los datos en orden" });
  }

  //const user = new User(req.body);
};
