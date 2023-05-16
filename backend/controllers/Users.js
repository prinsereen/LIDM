import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async(req, res ) => {
    try {
        const respons = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(respons);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const getUserById = async(req, res ) => {
    try {
        const respons = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(respons);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const createUser = async(req, res ) => {
    const {name, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg : "Password and Confirmation Password not match"});
    const hashPassword = await argon2.hash(password);

    // Check if email already exists in database
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        return res.status(400).json({ msg: 'Email already registered' });
    }

    try {
        await Users.create({
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


export const updateUser = async(req, res ) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg : "user not found"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if (password === "" || password == null){
        hashPassword = user.password;
    }else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({msg : "Password and Confirmation Password not match"});
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id : user.id
            }
        });
        res.status(201).json({msg : "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};
export const deleteUser = async(req, res ) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg : "user not found"});
    try {
        await Users.destroy({
            where: {
                id : user.id
            }
        });
        res.status(201).json({msg : "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};