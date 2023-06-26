import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { reset, getMe } from "../state/index.js";
import { logo, notebook } from "../assets";
import axios from "axios";

const Donasi = () => {
  const [formData, setFormData] = useState({
    title: "",
    classification: "Sains",
    status: "Draft",
    author: "",
    file_mp3: "",
    file_pdf: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading

      const updatedData = {
        title: formData.title,
        classification: formData.classification,
        status: "Draft",
        author: formData.author,
        file_mp3: formData.file_mp3,
        file_pdf: formData.file_pdf,
      };

      const formDataToSend = new FormData();
      for (let key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
      }

      // Send the post request using Axios
      const response = await axios.post(
        "https://lidm-production.up.railway.app/Files",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      resetForm();
      navigate(`/donatur/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      classification: "",
      status: "Draft",
      author: "",
      file_mp3: "",
      file_pdf: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        {/* Rest of the code */}
      </div>
      <div className="px-72 flex flex-col overflow-hidden">
        {/* Rest of the code */}
        <div className="h-full w-full mt-10 rounded-md bg-white">
          <div className="flex flex-col items-start justify-center cursor-text px-[65px] py-[22px]">
            <p className="font-bold text-xl mb-5">Formulir Donasi Baru</p>
            <form onSubmit={handleSubmit} className="w-full">
              {/* Form fields */}
              {/* Rest of the code */}
              <div className="flex items-center justify-end py-10">
                <button
                  onClick={resetForm}
                  className="rounded-md text-white bg-[#0868F9] px-8 py-4 mr-6 h-14 w-28 font-semibold"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md text-white bg-[#0868F9] px-8 py-4 h-14 w-28 font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Kirim"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donasi;
