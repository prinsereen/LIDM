import { Link } from "react-router-dom";
import { profile, read, listen, search, filter } from "../assets";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";

const KategoriDengar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [files, setFiles] = useState([]);
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  // Filter the files based on search query and filter option
  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.classification.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterOption === "" ||
      filterOption === "All" ||
      file.classification === filterOption;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lidm-production.up.railway.app/Mp3Files"
        );
        setFiles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve the profile name from local storage on page load
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfileName && storedProfilePhoto) {
      setProfileName(storedProfileName);
      setProfilePhoto(storedProfilePhoto);
    }
  }, []);

  const type = "listen";

  return (
    <div>
      <Navbar />
      <div className="ml-72 flex flex-col overflow-hidden">
        <div className="flex justify-start w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Kategori</h1>
            <p className="max-w-3xl">Halo, Sobat Literasi!</p>
            <p>
              Belajar yang menyenangkan adalah belajar sesuai dengan minat dan
              cara belajarmu.{" "}
            </p>
          </div>
          <div className="flex mt-9 ml-52 items-center ">
            <img src={profilePhoto} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">{profileName}</h1>
            </Link>
          </div>
        </div>
        <div className="flex mt-9">
          <div className="flex">
            <input
              className="rounded-xl  text-black text-[20px] placeholder-[#939FB1] py-3 px-5 w-[40rem]"
              placeholder="Cari judul dan kategori"
              value={searchQuery}
              onChange={handleSearchChange}
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
              value={filterOption}
              onChange={handleFilterChange}
              placeholder="Kategori"
              className="w-56"
            >
              <option value="">All</option>
              <option value="Sains">Sains</option>
              <option value="Sosial">Sosial</option>
              <option value="Seni">Seni</option>
              <option value="Sastra">Sastra</option>
              <option value="Bahasa">Bahasa</option>
            </select>
          </div>
        </div>
        <div className="bg-[#939FB1] h-[1px] w-[90%] my-10  " />
        <div className="flex flex-wrap gap-10 ">
          {/* Render the files */}
          {filteredFiles.map((file) => (
            <Link to={`/read/kategori2/audio/${file.uuid}`} key={file.uuid}>
              <Card file={file} type={type} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KategoriDengar;
