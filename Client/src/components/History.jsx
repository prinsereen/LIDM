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
        <div className="bg-white w-[1000px] mt-10 rounded-lg shadow-lg">
          <table className="table-auto h-full w-[950px] m-5 rounded-md  ">
            <thead>
              <tr>
                <th className="bg-white text-left px-8 py-4">Tanggal</th>
                <th className="bg-white text-left px-8 py-4">Judul</th>
                <th className="bg-white  text-left px-8 py-4">Ringkasan</th>
                <th className="bg-white  text-center px-8 py-4">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((sum, index) => {
                if (index < 5) {
                  return (
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
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
