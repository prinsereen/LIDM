import Summary from "../models/Summary.js"
import User from "../models/UserModel.js";
import {Op} from "sequelize"

export const getSummary = async(req, res ) => {
    try {
        let response;
        if (req.role === "admin"){
            response = await Summary.findAll({
                attributes:['uuid', 'summary', 'grade'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else if (req.role === "user"){
            response = await Summary.findAll({
                attributes:['uuid', 'summary', 'grade'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else {
            res.status(403).json({msg: "Accsess Forbidden"})
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};
export const getSummaryById = async(req, res ) => {
    try {
        const summary = await Summary.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!summary) return res.status(404).json({msg : "Summary Not Found"});
        let response;
        if (req.role === "admin"){
            response = await Summary.findOne({
                attributes:['uuid', 'summary', 'grade'],
                where: {
                    id: summary.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else if (req.role === "user"){
            response = await Summary.findOne({
                attributes:['uuid', 'summary', 'grade'],
                where: {
                    [Op.and] : [{id : summary.id}, {userId: req.userId}]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        }else {
            res.status(403).json({msg: "Accsess Forbidden"})
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};

export const createSummary = async(req, res ) => {
    const {summary, grade} = req.body; // Perlu Konfigurasi Nanti ketika fetch api ML
    try {
        if ( req.role === "user"){            
            await Summary.create({
                summary : summary,
                grade: grade,
                userId : req.userId
            })
            res.status(201).json({msg: "Summary Created Succsessfully"})
        }else {
            res.status(403).json({msg: "Access Forbidden"})
        }
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};
