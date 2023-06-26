import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

      console.log(formDataToSend);
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

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    history.push("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        <div className="flex flex-col items-center gap-2">
          <Link to={`/donatur/${id}`}>
            <img src={logo} className=" ml-4" alt="Logo" />
          </Link>
          <div className="bg-black h-[1px] w-32 " />
          <img src={notebook} className="mt-6" alt="Notebook" />
        </div>

        <button onClick={logout} className=" mt-48">
          <svg width="45" height="45" fill="none">
            <path
              stroke="#3B3A5B"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M29.5 2H37a5 5 0 0 1 5 5v30a5 5 0 0 1-5 5h-7.5M12 12 2 22l10 10M2 22h30"
            />
          </svg>
        </button>
      </div>
      <div className="px-72 flex flex-col overflow-hidden">
        <div className="flex justify-between w-full h-auto">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Tambah Donasi</h1>
          </div>
        </div>
        <div className="h-full w-full mt-10 rounded-md bg-white">
          <div className="flex flex-col items-start justify-center cursor-text px-[65px] py-[22px]">
            <p className="font-bold text-xl mb-5">Formulir Donasi Baru</p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6 w-full">
                <label className="text-xl mb-2">
                  Judul <span className="text-red-600">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                />
              </div>
              <div className="mb-6 w-full">
                <div className="text-xl mb-2">
                  Kategori<span className="text-red-600">*</span>
                </div>
                <select
                  id="Kategori"
                  placeholder="Kategori"
                  name="classification"
                  value={formData.classification}
                  onChange={handleChange}
                  className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                >
                  <option value="Sains">Sains</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Seni">Seni</option>
                  <option value="Sastra">Sastra</option>
                  <option value="Bahasa">Bahasa</option>
                </select>
              </div>
              <div className="mb-6 w-full">
                <label className="text-xl mb-2">
                  Author <span className="text-red-600">*</span>
                </label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                />
              </div>
              <div className="mb-6 w-full">
                <label className="text-xl mb-2">
                  Upload Pdf File <span className="text-red-600">*</span>
                </label>
                <input
                  id="file_pdf"
                  type="file"
                  name="file_pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, file_pdf: e.target.files[0] })
                  }
                  className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                />
              </div>

              <div className="mb-6 w-full">
                <label className="text-xl mb-2">
                  Upload File Mp3 <span className="text-red-600">*</span>
                </label>
                <input
                  id="file_mp3"
                  type="file"
                  name="file_mp3"
                  onChange={(e) =>
                    setFormData({ ...formData, file_mp3: e.target.files[0] })
                  }
                  className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                />
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
                    Kirim
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donasi;
