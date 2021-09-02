import { RequestHandler } from "express";
import User from "../models/User";
import { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign(
    {
      id: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
}

//const verifyJWT = (req, res, next) =>

export const getUser: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //console.log(req);
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }

  const match = await user.comparePassword(req.body.password);
  if (match) {
    console.log(user);
    const token = createToken(user);
    res.header("auth-token", token).json(token);
    //return res.status(200).json({ token: createToken(user) });
  } else {
    return res.status(401).json({
      message: "El mail o contraseña es incorrecto",
    });
  }
};

export const getUserBoolean: RequestHandler = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //console.log(req);
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }

  const match = await user.comparePassword(req.body.password);
  if (match) {
    const token = createToken(user);
    return res.status(200).json({
      name: user.firstName + " " + user.lastName,
      email: user.email,
      token: token,
    });
    //return res.status(200).json({ token: createToken(user) });
  } else {
    return res.status(401).json({
      message: "El mail o contraseña es incorrecto",
    });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  //console.log(req.body);
  //const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ message: "por favor añadir todos los datos" });
  }
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound)
    return res.status(301).json({ message: "El mail registrado ya existe" });

  /*   const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  }); */

  //const user = new User(req.body);
  const newUser = new User(req.body);
  await newUser.save();
  //si el usuario se registra, se envia automaticamente un token para su ingreso
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Error al crear al usuario" });
  } else {
    const token = createToken(user);
    res.header("auth-token", token).json(token);
  }
  //res.send({ message: "Usuario registrado satisfactoriamente" });
};
