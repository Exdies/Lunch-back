import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getUser: RequestHandler = (req, res) => {
  res.json("obtain user");
};

export const createUser: RequestHandler = async (req, res) => {
  //console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound)
    return res.status(301).json({ message: "El mail registrado ya existe" });
  //const user = new User(req.body);
  await newUser.save();
  res.send({ message: "Usuario registrado satisfactoriamente" });
};
