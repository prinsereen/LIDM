import Summary from "../models/Summary.js";
import User from "../models/UserModel.js";
import File from "../models/FileModel.js";
import { Op } from "sequelize";
import axios from "axios";
import pdfParser from "pdf-parser";

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
  const { uuid } = req.body;

  const file = await File.findOne({
    where: {
      uuid: uuid,
    },
  });

  try {
    if (file) {
      let response = await File.findOne({
        attributes: ["id", "file_pdf"],
        where: {
          uuid: uuid,
        },
      });
      const filePath = response.file_pdf;

      pdfParser.pdf2json(filePath, function (error, pdf) {
        if (error != null) {
          res.status(500).json({ msg: error.message });
        } else {
          const texts = pdf.pages.reduce((acc, page) => {
            const pageTexts = page.texts.map((item) => item.text);
            return acc.concat(pageTexts);
          }, []);
          const response = texts;
          const responseJSON = JSON.stringify(response);
          const cleanedString = responseJSON.replace(/["\\,]/g, "");
          res.status(200).json({ text: cleanedString });
        }
      });
    } else {
      res.status(403).json({ msg: "File Not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSummary = async (req, res) => {
  const { summary, uuid } = req.body;
  const file = await File.findOne({
    where: {
      uuid: uuid,
    },
  });

  try {
    const file1 = await axios.post(
      "https://lidm-production.up.railway.app/getPdfbyFileId",
      { uuid: uuid },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pdfData = file1.data.text;
    const jaccard = await axios.post(
      "https://web-production-083b.up.railway.app/jaccard-similarity",
      { file1: pdfData, file2: summary }
    );
    const jaccard_value = jaccard.data.jaccard_similarity;

    const options = {
      method: "POST",
      url: "https://sentimental2.p.rapidapi.com/Analyze",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8121cbed28msh7b4fdbcaade1734p171d43jsn71f6d6506073",
        "X-RapidAPI-Host": "sentimental2.p.rapidapi.com",
      },
      data: {
        Message: summary,
      },
    };

    const response = await axios.request(options);

    const spam = response.data.result.spam;
    const grammar = response.data.result.grammar;
    const sentiment = response.data.result.sentiment;
    const violence = response.data.result.violence;
    const sexual = response.data.result.sexual;
    const scholarly = response.data.result.scholarly;

    const grade = await axios.post(
      "https://web-production-4805.up.railway.app/grade",
      {
        jaccard: jaccard_value,
        spam: spam,
        grammar: grammar,
        sentiment: sentiment,
        violence: violence,
        sexual: sexual,
        scholarly: scholarly,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const aiSimilarity = {
      method: "GET",
      url: "https://ai-content-detector1.p.rapidapi.com/",
      params: {
        text: summary,
      },
      headers: {
        "X-RapidAPI-Key": "8121cbed28msh7b4fdbcaade1734p171d43jsn71f6d6506073",
        "X-RapidAPI-Host": "ai-content-detector1.p.rapidapi.com",
      },
    };

    let aiDetection = await axios.request(aiSimilarity);
    aiDetection = aiDetection.data.fake_probability;
    let nilaiAkhir = grade.data.prediction;
    if (jaccard_value >= 0.025) {
      nilaiAkhir = nilaiAkhir - nilaiAkhir * (aiDetection * 30);
    }
    if (jaccard_value > 0.1) {
      nilaiAkhir -= 20;
    } else if (jaccard_value <= 0.015) {
      nilaiAkhir -= 50;
    } else if (jaccard_value >= 0.015 && jaccard_value < 0.02) {
      nilaiAkhir -= 40;
    } else if (jaccard_value >= 0.02 && jaccard_value < 0.025) {
      nilaiAkhir -= 25;
    } 

    if (nilaiAkhir < 0) {
      nilaiAkhir = 0;
    }
    if (req.role === "user") {
      await Summary.create({
        summary: summary,
        userId: req.userId,
        fileId: file.id,
        jaccard: jaccard_value,
        spam: spam,
        grammar: grammar,
        sentiment: sentiment,
        violence: violence,
        sexual: sexual,
        scholarly: scholarly,
        aidetection: aiDetection,
        grade: nilaiAkhir,
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
        attributes: [
          "uuid",
          "summary",
          "grade",
          "createdAt",
          "jaccard",
          "spam",
          "grammar",
          "violence",
          "sexual",
          "scholarly",
          "aidetection",
        ],
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

      const feedbackedResponse = response.map((summary) => {
        const feedback = generateFeedback(summary.dataValues);
        summary.dataValues.feedback = feedback;
        return summary;
      });

      res.status(200).json(feedbackedResponse);
    } else {
      return res.status(403).json({ msg: "Access Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const generateFeedback = (summary) => {
  let feedback = "";

  if (summary.jaccard < 0.025) {
    feedback +=
      "Summary Anda tidak memiliki kemiripan dengan bacaan atau summary Anda terlalu pendek. ";
  } else if (summary.jaccard > 0.1) {
    feedback += "Summary terlalu mirip dengan bacaan asli. ";
  }

  if (summary.spam > 0 && summary.spam <= 5) {
    feedback += "Summary Anda terindikasi spam ringan. ";
  } else if (summary.spam > 5 && summary.spam <= 10) {
    feedback += "Summary Anda terindikasi spam berat. ";
  }

  if (summary.violence > 0 && summary.violence <= 5) {
    feedback += "Summary Anda terindikasi violence ringan. ";
  } else if (summary.violence > 5 && summary.violence <= 10) {
    feedback += "Summary Anda terindikasi violence berat. ";
  }

  if (summary.grammar >= 0 && summary.grammar <= 5) {
    feedback += "Grammar dalam summary Anda bisa ditingkatkan lagi. ";
  }

  if (summary.scholarly >= 0 && summary.scholarly <= 5) {
    feedback +=
      "Kosa Kata Akademik dalam summary Anda bisa ditingkatkan lagi. ";
  }

  if (summary.aidetection > 0.007 && summary.jaccard >= 0.025) {
    feedback += "Summary Anda terindikasi dibuat oleh AI ";
  }

  if (feedback === "") {
    feedback += "Summary Anda sudah bagus. Namun, bisa diperbanyak lagi";
  }

  return feedback.trim();
};

export const getTotalScoreByUser = async (req, res) => {
  try {
    let response;
    if (req.role === "user") {
      response = await Summary.findAll({
        attributes: ["uuid", "grade"],
        include: [
          {
            model: User,
            where: { id: req.userId }, // Filter by user ID
          },
        ],
      });
      let totalGrade = response.reduce((total, item) => total + item.grade, 0);
      totalGrade = totalGrade / response.length;
      const roundedGrade = parseFloat(totalGrade.toFixed(2));

      await User.update(
        {
          score: roundedGrade,
        },
        {
          where: {
            id: req.userId,
          },
        }
      );

      res.status(200).json({ msg: "updated" });
    } else {
      return res.status(403).json({ msg: "Access Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
