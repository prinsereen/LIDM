import File from "../models/FileModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize"

export const getFile = async(req, res ) => {
    try {
        let response;
        if (req.role === "admin"){
            response = await File.findAll({
                attributes:['uuid', 'title', 'classification', 'status'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else if (req.role === "donatur"){
            response = await File.findAll({
                attributes:['uuid', 'title', 'classification', 'status'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else {
            response = await File.findAll({
                attributes:['uuid', 'title', 'classification', 'status'],
                where: {
                    status: "disetujui"
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};
export const getFileById = async(req, res ) => {
    try {
        const file = await File.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!file) return res.status(404).json({msg : "File Not Found"});
        let response;
        if (req.role === "admin"){
            response = await File.findOne({
                attributes:['uuid', 'title', 'classification', 'status'],
                where: {
                    id: file.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else if (req.role === "donatur"){
            response = await File.findOne({
                attributes:['uuid', 'title', 'classification', 'status'],
                where: {
                    [Op.and] : [{id : product.id}, {userId: req.userId}]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else {
            response = await File.findOne({
                attributes:['uuid', 'title', 'classification', 'status'],
                where: {
                    id: file.id,
                    status: "disetujui"
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};

export const createFile = async(req, res ) => {
    const {title, classification, status, author, type} = req.body;
    try {
        if (req.role === "admin" || req.role === "donatur"){            
            await File.create({
                title: title,
                classification: classification,
                status: status,
                author: author,
                type: type,
                userId: req.userId,
                file: req.file.path
            })
            console.log(req.file)
            res.status(201).json({msg: "File Created Succsessfully"})
        }else {
            res.status(403).json({msg: "Access Forbidden"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};
export const updateFile = async(req, res ) => {
    try {
        const file = await File.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!file) return res.status(404).json({msg : "File Not Found"});
        const {classification, status} = req.body;
        if (req.role === "admin"){
            await file.update({
                classification : classification,
                status : status
            },{
                where: {
                    id : file.id
                }
            })
            res.status(200).json({msg: "updated"});
        }else {
            res.status(403).json({msg: "Accsess Forbidden"});
        }
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};
export const deleteFile = async (req, res) => {
    try {
        const file = await File.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!file) return res.status(404).json({msg : "File Not Found"});
        if (req.role === "admin"){
            await file.destroy({
                where: {
                    id : file.id
                }
            })
            res.status(200).json({msg: `File was Deleted From database`});
        }else {
            res.status(403).json({msg: "Accsess Forbidden"});
        }
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};  