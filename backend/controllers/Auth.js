import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });

  req.session.userId = user.uuid;
  const { uuid, name, email, role, jenjang } = user;
  res.status(200).json({ uuid, name, email, role, jenjang });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Can't logout" });
    res.status(200).json({ msg: "Logout successfully" });
  });
};

export const register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirmation Password do not match" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  if (role === "admin")
    return res.status(403).json({ msg: "Admin forbidden to register" });

  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.status(400).json({ msg: "Email already registered" });
  }

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registered" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
