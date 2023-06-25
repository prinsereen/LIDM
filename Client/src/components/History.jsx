import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { ProfileContext } from "../app/ProfileContext";
import { profile } from "../assets";

const History = () => {
  const [summary, setSummary] = useState([]);
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(summary.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lidm-production.up.railway.app/UserSummary"
        );

        setSummary(response.data);
        console.log(response.data);
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

  const getFirstWords = (paragraph, count) => {
    const words = paragraph.split(" ");
    const firstWords = words.slice(0, count).join(" ");

    const htmlString = firstWords;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    const textContent = tempElement.textContent;

    return textContent;
  };

  const getDate = (date) => {
    const datetimeString = date;
    const dateId = new Date(datetimeString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = dateId.toLocaleDateString(["ban", "id"], options);

    return formattedDate;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = summary.slice(startIndex, endIndex);

  // if (!profileName || !profilePhoto) {
  //   return null;
  // }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ml-32 px-24">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Riwayat Ringkasan</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profilePhoto} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">{profileName}</h1>
            </Link>
          </div>
        </div>
        <div className="bg-white  mt-10 rounded-lg shadow-lg">
          <table className="table-auto h-full  m-5 rounded-md  ">
            <thead>
              <tr>
                <th className="bg-white text-left px-8 py-4">Tanggal</th>
                <th className="bg-white text-left px-8 py-4">Judul</th>
                <th className="bg-white  text-left px-8 py-4">Ringkasan</th>
                <th className="bg-white  text-center px-8 py-4">Nilai</th>
                <th className="bg-white  text-center px-8 py-4">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((sum, index) => (
                <tr key={index} className="hover:bg-[#F4F4F4]">
                  <td className="border-y-2 px-8 py-4  ">
                    <div>{getDate(sum.createdAt)}</div>
                  </td>
                  <td className="border-y-2 px-8 py-4    ">
                    <div>{sum.file.title}</div>
                  </td>
                  <td className="border-y-2 px-8 py-4 4] ">
                    {getFirstWords(sum.summary, 15)}
                  </td>
                  <td className="border-y-2 text-center px-8 py-4 ">
                    {sum.grade}
                  </td>
                  <td className="border-y-2 text-center px-8 py-4 ">
                    {sum.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-6">
            <ul className="flex">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`mx-1 ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                >
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
