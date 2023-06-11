import Competition from "../models/CompetitionModel.js";

export const createCompetition = async (req, res) => {

    const {competition_id, competition_name, tanggal_pelaksanaaan, tingkat} = req.body;

    try {
        await Competition.create({
            competition_id : competition_id,
            competition_name : competition_name,
            tanggal_pelaksanaaan : tanggal_pelaksanaaan,
            tingkat : tingkat,
            competition_logo : req.file.path
        })
        res.status(201).json({msg : "Competition Created Successfully"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
  };