import Summary from "../models/Summary.js";
import User from "../models/UserModel.js";
import File from "../models/FileModel.js";
import { Op } from "sequelize";
import fs from "fs";
import axios from "axios";
import pdfParser from "pdf-parser"


export const getSummary = async (req, res) => {
  try {
    let response;
    if (req.role === "user") {
      response = await Summary.findAll({
        attributes: ["uuid", "summary", "grade"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: File, // Include the "File" model
            attributes: ["title", "classification", "author", "file_pdf"], // Specify the desired attributes from the "File" model
          },
        ],
      });
    } else {
      res.status(403).json({ msg: "Accsess Forbidden" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getSummaryById = async (req, res) => {
  try {
    const summary = await Summary.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!summary) return res.status(404).json({ msg: "Summary Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Summary.findOne({
        attributes: ["uuid", "summary", "grade"],
        where: {
          id: summary.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: File, // Include the "File" model
            attributes: ["title", "classification", "author", "file_pdf"], // Specify the desired attributes from the "File" model
          },
        ],
      });
    } else if (req.role === "user") {
      response = await Summary.findOne({
        attributes: ["uuid", "summary", "grade"],
        where: {
          [Op.and]: [{ id: summary.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: File, // Include the "File" model
            attributes: ["title", "classification", "author", "file_pdf"], // Specify the desired attributes from the "File" model
          },
        ],
      });
    } else {
      res.status(403).json({ msg: "Accsess Forbidden" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getPdfByFileId = async (req, res) => {
  const {fileId} = req.body

  const file = await File.findOne({
    where: {
      id: fileId,
    },
  });

  try {
    if (file) {
      let response = await File.findOne({
        attributes: ['id', 'file_pdf'],
        where: {
          id: fileId,
        },
      })
      const filePath = response.file_pdf;

      pdfParser.pdf2json(filePath, function (error, pdf) {
        if(error != null){
            res.status(500).json({ msg: error.message })
        }else{
            const texts = pdf.pages.reduce((acc, page) => {
              const pageTexts = page.texts.map(item => item.text);
              return acc.concat(pageTexts);
            }, []);
            const response = texts
            const responseJSON = JSON.stringify(response);
            const cleanedString = responseJSON.replace(/["\\,]/g, '');
            res.status(200).json({text : cleanedString})
        }
    });
    } else {
      res.status(403).json({ msg: "File Not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}



export const createSummary = async (req, res) => {
  const { summary, fileId } = req.body; // Perlu Konfigurasi Nanti ketika fetch api ML
  // console.log(fileId);
  const file = await File.findOne({
    where: {
      id: fileId,
    },
  });

  try {
    const file1 = await axios.post('http://localhost:5000/getPdfbyFileId', { fileId: fileId }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const pdfData = file1.data.text;
    console.log(pdfData);
    const jaccard = await axios.post('https://0dd1-34-82-155-60.ngrok.io/jaccard-similarity', {file1: pdfData, file2:summary}, )
    console.log(jaccard.data.jaccard_similarity)
  } catch (error) {
    console.error('Error retrieving the PDF:', error);
  }

  try {
    if (req.role === "user") {
      await Summary.create({
        summary: summary,
        userId: req.userId,
        grade: null,
        fileId: file.id,
      });
      res.status(201).json({ msg: "Summary Created Succsessfully" });
    } else {
      res.status(403).json({ msg: "Access Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSummaryByUser = async (req, res) => {
  try {
    let response;
    if (req.role === "user") {
      response = await Summary.findAll({
        attributes: ["uuid", "summary", "grade", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
            where: { id: req.userId }, // Filter by user ID
          },
          {
            model: File,
            attributes: ["title", "classification", "author", "file_pdf"],
          },
        ],
      });
    } else {
      return res.status(403).json({ msg: "Access Forbidden" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
