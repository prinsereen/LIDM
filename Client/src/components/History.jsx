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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ml-32 px-24">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Buat Ringkasan</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col h-full w-[1000px] mt-10 rounded-md bg-white">
          <div className="flex justify-evenly gap-20 mt-9">
            <h1 className=" text-3xl mb-5">Judul</h1>
            <h1 className=" text-3xl mb-5">Ringkasan</h1>
          </div>
          <div className="flex">
            <div>
              {summary.map((sum) => (
                <p key={sum.file.title}>{sum.file.title}</p>
              ))}
            </div>
            <div>
              {summary.map((sum) => (
                <p key={sum.file.title}>{sum.summary}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
