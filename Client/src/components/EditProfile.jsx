import { useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [title, setTitle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confPassword: "",
    asal_instansi: "",
    tanggal_lahir: "",
    user_photo: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();
  const id = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (formData.password !== formData.confPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const updatedData = {
        name: formData.nama,
        email: formData.email,
        password: formData.password,
        confPassword: formData.confPassword,
        asal_instansi: formData.asal_instansi,
        tanggal_lahir: formData.tanggal_lahir,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("user_photo", selectedAvatar);

      for (let key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
      }

      // Send the patch request using Axios
      const response = await axios.patch(
        `https://lidm-production.up.railway.app/users/${id.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Process the form submission
      // console.log(response.data);
      // Reset the form
      resetForm();
      navigate(`/profile/${id.id}`);
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      password: "",
      asal_instansi: "",
      tanggal_lahir: "",
      user_photo: "",
    });
    setSelectedAvatar(null);
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-72 flex flex-col overflow-hidden">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Edit Profile</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="h-full w-[1000px] mt-10 rounded-md bg-white">
            <div className="flex flex-col  cursor-text px-[65px] py-[22px]">
              <p className="font-bold text-xl mb-5">Data Profil</p>
              <div className="flex flex-col sm:flex-row justify-evenly gap-20">
                <div className="flex flex-col w-full sm:w-[50%]">
                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="title">
                      Nama <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="nama"
                      type="text"
                      name="nama"
                      value={formData.nama}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="title">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-[50%]">
                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="total_page">
                      Asal Sekolah <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="asal_sekolah"
                      name="asal_instansi"
                      type="text"
                      value={formData.asal_instansi}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="title">
                      Tanggal Lahir <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="tanggal_lahir"
                      type="date"
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col  cursor-text px-[65px] py-[22px]">
              <p className="font-bold text-xl mb-5">Ganti Sandi</p>
              <div className="flex flex-col sm:flex-row justify-evenly gap-20">
                <div className="flex flex-col w-full sm:w-[50%]">
                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="title">
                      Sandi <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="sandi"
                      name="password"
                      type="password"
                      value={formData.password}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-[50%]">
                  <div className="mb-6 w-full">
                    <label className="text-base mb-2" htmlFor="total_page">
                      Konfirmasi Sandi <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="confPassword"
                      type="password"
                      name="confPassword"
                      value={formData.confPassword}
                      className="rounded-md px-5 py-3 border border-[#0868F9] w-full h-8"
                      onChange={handleChange}
                    />
                    {!passwordMatch && (
                      <p className="text-red-600 mt-1">
                        Sandi dan Konfirmasi sandi harus sama.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-[2px] w-full bg-[#D9D9D9] mb-6 " />
              <div className="mb-6 w-full">
                <label className="text-base mb-2" htmlFor="total_page">
                  Avatar <span className="text-red-600">*</span>
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="rounded-md px-5 py-3 w-full "
                  onChange={handleAvatarChange}
                />
                <h1 className="text-xs">
                  Pastikan foto mempunyai dimensi 1:1 dan berukuran maksimal
                  <span className="font-bold"> 2MB</span>{" "}
                </h1>
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="mt-2 rounded-md max-w-[200px] max-h-[200px]"
                  />
                )}
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md text-white bg-[#0868F9] text-sm  mr-6 h-7 w-28 font-semibold"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className="rounded-md text-white bg-[#0868F9] text-sm  h-7 w-28 font-semibold"
                >
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
