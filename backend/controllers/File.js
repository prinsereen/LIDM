import File from "../models/FileModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import fs from "fs";

export const getFile = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await File.findAll({
        attributes: ["uuid", "title", "classification", "status", "file_pdf", "file_mp3", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else if (req.role === "donatur") {
      response = await File.findAll({
        attributes: ["uuid", "title", "classification", "status", "createdAt"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await File.findAll({
        attributes: ["uuid", "title", "classification", "status", "createdAt"],
        where: {
          status: "diterima",
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFileById = async (req, res) => {
  try {
    const file = await File.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!file) return res.status(404).json({ msg: "File Not Found" });
    let response;
    if (req.role === "admin") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
          "createdAt",
        ],
        where: {
          id: file.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else if (req.role === "donatur") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
          "createdAt",
        ],
        where: {
          [Op.and]: [{ id: file.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
          "createdAt",
        ],
        where: {
          id: file.id,
          status: "diterima",
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPdfFile = async (req, res) => {
  try {
    const file = await File.findAll({
      where: {
        file_pdf: {
          [Op.not]: null, // Check if file_pdf is not null
        },
      },
    });

    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    let response;
    response = await File.findAll({
      attributes: ["uuid", "title", "classification", "status", "file_pdf"],
      where: {
        file_pdf: {
          [Op.not]: null, // Check if file_pdf is not null
        },
        status: "diterima",
      },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMp3File = async (req, res) => {
  try {
    const file = await File.findAll({
      where: {
        file_mp3: {
          [Op.not]: null, // Check if file_mp3 is not null
        },
      },
    });

    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    let response;
    response = await File.findAll({
      attributes: [
        "uuid",
        "title",
        "classification",
        "status",
        "file_pdf",
        "file_mp3",
      ],
      where: {
        file_mp3: {
          [Op.not]: null, // Check if file_mp3 is not null
        },
        status: "diterima",
      },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createFile = async (req, res) => {
  const { title, classification, status, author } = req.body;
  try {
    if (req.role === "admin" || req.role === "donatur") {
      let pdfFile;
      let mp3File;

      if (req.files["file_pdf"]) {
        pdfFile = req.files["file_pdf"][0]; // Retrieve the PDF file
      }

      if (req.files["file_mp3"]) {
        mp3File = req.files["file_mp3"][0]; // Retrieve the MP3 file
      }

      await File.create({
        title: title,
        classification: classification,
        status: status,
        author: author,
        userId: req.userId,
        file_pdf: pdfFile ? pdfFile.path : null, // Store PDF file path if uploaded, otherwise set to null
        file_mp3: mp3File ? mp3File.path : null, // Store MP3 file path if uploaded, otherwise set to null
      });

      console.log(pdfFile, mp3File);
      res.status(201).json({ msg: "File Created Successfully" });
    } else {
      res.status(403).json({ msg: "Access Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const file = await File.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!file) return res.status(404).json({ msg: "File Not Found" });
    const { classification, status } = req.body;
    if (req.role === "admin") {
      await file.update(
        {
          classification: classification,
          status: status,
        },
        {
          where: {
            id: file.id,
          },
        }
      );
      res.status(200).json({ msg: "updated" });
    } else {
      res.status(403).json({ msg: "Accsess Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!file) return res.status(404).json({ msg: "File Not Found" });
    if (req.role === "admin") {
      await file.destroy({
        where: {
          id: file.id,
        },
      });
      res.status(200).json({ msg: `File was Deleted From database` });
    } else {
      res.status(403).json({ msg: "Accsess Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPdfById = async (req, res) => {
  try {
    const file = await File.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    let response;
    if (req.role === "admin") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
        ],
        where: {
          id: file.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else if (req.role === "donatur") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
        ],
        where: {
          [Op.and]: [{ id: file.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_pdf",
        ],
        where: {
          id: file.id,
          status: "diterima",
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    if (!response) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    /*  console.log(response) */

    const filePath = response.file_pdf; // Update with the actual file path
    /* console.log(filePath) */

    fs.readFile(filePath, (error, data) => {
      if (error) {
        return res.status(500).json({ msg: "Error reading file" });
      }
      res.contentType("application/pdf");
      res.send(data);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMp3ById = async (req, res) => {
  try {
    const file = await File.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!file) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    let response;
    if (req.role === "admin") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_mp3",
        ],
        where: {
          id: file.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else if (req.role === "donatur") {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_mp3",
        ],
        where: {
          [Op.and]: [{ id: file.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await File.findOne({
        attributes: [
          "uuid",
          "title",
          "classification",
          "status",
          "author",
          "file_mp3",
        ],
        where: {
          id: file.id,
          status: "diterima",
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    if (!response) {
      return res.status(404).json({ msg: "File Not Found" });
    }

    /*  console.log(response) */

    const filePath = response.file_mp3; // Update with the actual file path
    /* console.log(filePath) */

    fs.readFile(filePath, (error, data) => {
      if (error) {
        return res.status(500).json({ msg: "Error reading file" });
      }
      res.contentType("audio/mp3"); // Set the content type to "audio/mp3"
      res.send(data);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
