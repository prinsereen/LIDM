import User from "../models/UserModel.js";

export const getUserLeadeboard = async (req, res) => {
  try {
    const respons = await User.findAll({
        attributes: ["name", "email", "jenjang", "asal_instansi", "score"],
        order: [["score", "DESC"]],
        where: {
          role: "user"
        }
    });
    res.status(200).json(respons);
} catch (error) {
    res.status(500).json({msg: error.message});
}
};


export const updateLeadeboard = async (req, res) => {
  try {
    const person = await User.findOne({
      where: {
         id: req.userId,
      },
    });
      console.log(person)
      res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
