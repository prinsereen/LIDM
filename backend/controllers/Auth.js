import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) return res.status(404).json({msg : "user not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const jenjang = user.jenjang;
    res.status(200).json({uuid, name, email, role, jenjang});
}

export const Me = async(req, res) =>{
    if(!req.session.userId) {
        return res.status(401).json({msg: "Please Login to Your Account"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg : "user not found"});
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err)=>{
        if (err) return res.status(400).json({msg: "can't Logout"});
        res.status(200).json({msg : "Logout Succesufully"});
    });
}

export const register = async(req, res ) => {
    const {name, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg : "Password and Confirmation Password not match"});
    const hashPassword = await argon2.hash(password);

    if (role === "admin") return res.status(403).json({msg: "Admin Forbidden to Register"});

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        return res.status(400).json({ msg: 'Email already registered' });
    }

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg : "Registered"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};