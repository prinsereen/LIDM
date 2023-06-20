import LeaderBoard from "../models/LeaderBoard.js";
import User from "../models/UserModel.js";

export const getUserLeadeboard = async (req, res) => {
  try {
    const response = await LeaderBoard.findAll({
      attributes: ["uuid", "score"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "jenjang", "asal_instansi"],
        },
      ],
      order: [["score", "DESC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createLeadeboard = async (req, res) => {
  const { score } = req.body;
  try {
    let response;
    response = await LeaderBoard.create({
      userId: req.userId,
      score: score,
    });
    res.status(201).json({ msg: "Leaderboard Created Succsessfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateLeadeboard = async (req, res) => {
  try {
    const leaderboard = await LeaderBoard.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!leaderboard)
      return res.status(404).json({ msg: "LeaderBoard Not Found" });
    const { score } = req.body;
    if (req.role === "admin") {
      await leaderboard.update({
        score: score,
      });
      res.status(200).json({ msg: "updated" });
    } else {
      res.status(403).json({ msg: "Accsess Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
