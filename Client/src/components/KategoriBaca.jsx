import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { profile, read, listen, search, filter } from "../assets";
import { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useEffect } from "react";

const KategoriBaca = () => {
  const [find, setFind] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
        setFiles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="ml-72 flex flex-col overflow-hidden">
        <div className="flex justify-start w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Kategori</h1>
            <p className="max-w-3xl">Halo, Sobat Literasi!</p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nec feugiat adipiscing
              tempus pulvinar sit.{" "}
            </p>
          </div>
          <div className="flex mt-9 ml-52 items-center ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
          </div>
        </div>
        <div className="flex mt-9">
          <div className="flex">
            <input
              className="rounded-xl  text-black text-[20px] placeholder-[#939FB1] py-3 px-5 w-[40rem]"
              placeholder="Cari judul dan kategori"
              value={find}
              // onChange=""
            />
            <img
              src={search}
              className="absolute right-1/2 translate-x-36 mt-1 cursor-pointer"
            />
          </div>
          <div className="flex mx-10 bg-white w-[20rem] rounded-lg">
            <img src={filter} className="m-2 w-10 h-10" />
            <div className="bg-[#939FB1] h-full w-[1px] mr-2 " />
            <select
              id="Kategori"
              value={selectedValue}
              onChange={handleInputChange}
              placeholder="Kategori"
              className="w-56"
            >
              <option value="Option 1">Sains</option>
              <option value="Option 2">Sosial</option>
              <option value="Option 3">Seni</option>
              <option value="Option 1">Sastra</option>
              <option value="Option 2">Bahasa</option>
            </select>
          </div>
        </div>
        <div className="bg-[#939FB1] h-[1px] w-[90%] my-10  " />
        <div className="flex flex-wrap gap-10 ">
          {/* Render the files */}
          {files.map((file) => (
            <Card key={file.uuid} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KategoriBaca;
