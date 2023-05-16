import UnverifiedFile from "../models/UnverifiedFile.js";

export const getUnverifiedFile = async(req, res ) => {
    try {
        const respons = await UnverifiedFile.findAll({
            attributes: ['uuid', 'title', 'classification', 'status', 'userId', 'file']
        });
        res.status(200).json(respons);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const getUnverifiedFileById = async(req, res ) => {
    try {
        const respons = await UnverifiedFile.findOne({
            attributes: ['uuid', 'title', 'classification', 'status', 'userId', 'file'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(respons);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const createUnverifiedFile = async(req, res ) => {
    const { title, classification, status } = req.body;

    try {
        await UnverifiedFile.create({
            title: title,
            classification: classification,
            staus: status,
            role: role,
            file: req.file.path
        });
        res.status(201).json({msg : "Unverified File Uploaded"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};


export const updateUnverifiedFile = async(req, res ) => {
    const UnverifiedFile = await UnverifiedFile.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!UnverifiedFile) return res.status(404).json({msg : "UnverifiedFile not found"});
    const {title, classification, password, confPassword, role} = req.body;
    let hashPassword;
    if (password === "" || password == null){
        hashPassword = UnverifiedFile.password;
    }else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({msg : "Password and Confirmation Password not match"});
    try {
        await UnverifiedFile.update({
            title: title,
            classification: classification,
            password: hashPassword,
            role: role
        }, {
            where: {
                id : UnverifiedFile.id
            }
        });
        res.status(201).json({msg : "UnverifiedFile Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};
export const deleteUnverifiedFile = async(req, res ) => {
    const UnverifiedFile = await UnverifiedFile.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!UnverifiedFile) return res.status(404).json({msg : "UnverifiedFile not found"});
    try {
        await UnverifiedFile.destroy({
            where: {
                id : UnverifiedFile.id
            }
        });
        res.status(201).json({msg : "UnverifiedFile Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};

//['uuid', 'title', 'class', 'status', 'userId']