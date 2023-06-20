import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { profile } from "../assets";
import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/UserSummary");

        setSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ml-32 px-24">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Riwayat Ringkasan</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
          </div>
        </div>
        <table className="table-auto h-full w-full border-2  border-[#CDCCEE] mt-10 rounded-md bg-white shadow-lg">
          <thead>
            <tr>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Tanggal
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">Judul</th>
              <th className="bg-blue-100 border text-left px-8 py-4">
                Ringkasan
              </th>
              <th className="bg-blue-100 border text-left px-8 py-4">Nilai</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((sum, index) => {
              if (index < 5) {
                return (
                  <tr key={index}>
                    <td className="border px-8 py-4 hover:bg-gray-50 ">
                      <div>{getDate(sum.createdAt)}</div>
                    </td>
                    <td className="border px-8 py-4 hover:bg-gray-50   ">
                      <div>{sum.file.title}</div>
                    </td>
                    <td className="border px-8 py-4 hover:bg-gray-50">
                      {getFirstWords(sum.summary, 15)}
                    </td>
                    <td className="border px-8 py-4 hover:bg-gray-50">
                      {sum.grade}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
