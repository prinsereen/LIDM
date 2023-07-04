import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import axios from "axios";
import fs from "fs";

export const getUser = async (req, res) => {
  try {
    const respons = await Users.findAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "asal_instansi",
        "jenjang",
        "tanggal_lahir",
        "user_photo",
      ],
    });
    res.status(200).json(respons);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserPhoto = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  try {
    if (user.user_photo) {
      const filePath = user.user_photo;
      fs.readFile(filePath, (error, data) => {
        if (error) {
          return res.status(500).json({ msg: "Error reading file" });
        }
        res.contentType("png");
        res.send(data);
      });
    } else {
      res.status(401).json({ msg: "User Photo Not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const respons = await Users.findOne({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "asal_instansi",
        "jenjang",
        "tanggal_lahir",
        "user_photo",
        "rekomendasi_kompetisi",
        "seni",
        "sosial",
        "sains",
        "sastra",
        "bahasa",
      ],
      where: {
        uuid: req.params.id,
      },
    });

    const fls2n = {
      nama_kompetisi: "FLS2N",
      tanggal_penyelanggaraan: "5-7 juli 2023",
      tingkat: "Nasional",
      path_logo: "../assets/compLogo/undefined_1686415524583.jpg",
    };

    const notYet = {
      msfg: "Belum Ada Rekomendasi nih :) Ayo Mulai Baca !!",
    };

    const kospi = {
      nama_kompetisi: "OPSI",
      tanggal_penyelanggaraan: "8 - 9 Agustus 2023",
      tingkat: "Nasional",
      path_logo: "../assets/compLogo/undefined_1686416568733.png",
    };

    const osn = {
      nama_kompetisi: "OSN",
      tanggal_penyelanggaraan: "1 - 17 Desember 2023",
      tingkat: "Nasional",
      path_logo: "../assets/compLogo/undefined_1686416184250.jpg",
    };
    let rek;
    if (respons.rekomendasi_kompetisi === -1) {
      rek = notYet;
    } else if (respons.rekomendasi_kompetisi === 0) {
      rek = fls2n;
    } else if (respons.rekomendasi_kompetisi === 1) {
      rek = osn;
    } else if (respons.rekomendasi_kompetisi === 2) {
      rek = kospi;
    }
    const responseData = {
      uuid: respons.uuid,
      name: respons.name,
      email: respons.email,
      role: respons.role,
      asal_instansi: respons.asal_instansi,
      jenjang: respons.jenjang,
      tanggal_lahir: respons.tanggal_lahir,
      user_photo: respons.user_photo,
      seni: respons.seni,
      sastra: respons.sastra,
      bahasa: respons.bahasa,
      sosial: respons.sosial,
      sains: respons.sains,
      rekomendasi_kompetisi: respons.rekomendasi_kompetisi,
      rek_description: rek,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirmation Password do not match" });
  }

  try {
    // Check if email already exists in the database
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      asal_instansi: null,
      jenjang: null,
      tanggal_lahir: null,
      user_photo: null,
      seni: 0,
      sosial: 0,
      sains: 0,
      sastra: 0,
      bahasa: 0,
      score: 0,
      rekomendasi_kompetisi: -1,
    });

    res.status(201).json({ msg: "Registered" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "user not found" });
  const {
    name,
    email,
    password,
    confPassword,
    role,
    asal_instansi,
    tanggal_lahir,
  } = req.body;
  let hashPassword;
  if (password === "" || password == null) {
    hashPassword = user.password;
  } else {
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirmation Password not match" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
        asal_instansi: asal_instansi,
        tanggal_lahir: tanggal_lahir,
        user_photo: req.file.path,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    /* console.log(req.file) */
    // Set CORS headers
    res.header(
      "Access-Control-Allow-Origin",
      "https://literatur.up.railway.app"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(201).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateRecomendation = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  const { sosial, sains, sastra, bahasa, seni } = req.body;

  const postData = {
    seni: seni,
    science: sains,
    sastra: sastra,
    sosial: sosial,
    bahasa: bahasa,
  };

  try {
    const response = await axios.post(
      "https://web-production-2f9a.up.railway.app/rekomendation",
      JSON.stringify(postData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const prediction = response.data.prediction;

    await Users.update(
      {
        sosial: sosial,
        sains: sains,
        sastra: sastra,
        bahasa: bahasa,
        seni: seni,
        rekomendasi_kompetisi: prediction,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    console.log(req.file);
    res.status(201).json({ msg: "Recomendation Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "user not found" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
