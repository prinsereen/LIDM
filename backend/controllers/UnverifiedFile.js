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
            status: status,
            file: req.file.path
        });
        res.status(201).json({msg : "Unverified File Uploaded"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};


export const updateUnverifiedFile = async(req, res ) => {
    const File = await UnverifiedFile.findOne({
        where: {
          uuid: req.params.id
        }
      });
      
      if (!File) {
        return res.status(404).json({ msg: "UnverifiedFile not found" });
      }
      
      const { title, classification, status } = req.body;
      
      try {
        await UnverifiedFile.update({
          title: title,
          classification: classification,
          status: status,
          file: req.file.file // Assuming want to update the file name in the database
        }, {
          where: {
            id: UnverifiedFile.id
          }
        });
      
        res.status(201).json({ msg: "UnverifiedFile Updated" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
      
};
export const deleteUnverifiedFile = async (req, res) => {
    try {
      const unverifiedFile = await UnverifiedFile.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!unverifiedFile) {
        return res.status(404).json({ msg: "UnverifiedFile not found" });
      }
      await unverifiedFile.destroy();
      res.status(201).json({ msg: "UnverifiedFile Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
};  