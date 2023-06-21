import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { profile } from "../assets";
import { useEffect, useState } from "react";
import axios from "axios";

const Star = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/LeaderBoard");

        setLeaderboard(response.data);
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
            <h1 className="font-bold text-4xl">Leaderboard</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
          </div>
        </div>

        <div className=" h-full w-[1000px] bg-white mt-10 rounded-xl shadow-lg ">
          <table className=" h-full w-[950px] bg-white  m-5 ">
            <thead>
              <tr>
                <th className="bg-white font-semibold text-left px-8 py-4 ">Nama</th>
                <th className="bg-white font-semibold text-left px-8 py-4 ">Asal Sekolah</th>
                <th className="bg-white font-semibold text-center px-8 py-4 ">Nilai</th>
                <th className="bg-white font-semibold text-center px-8 py-4 ">Peringkat</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((leader, index) => {
                if (index < 5) {
                  return (
                    <tr key={index} className="hover:bg-[#F4F4F4]">
                      <td className=" border-t-2 font-medium px-8 py-4 border-[#CDCCEE]    ">
                        <div className="flex items-center  ">
                          <img
                            src={profile}
                            alt="profile"
                            className="w-10 h-10 mx-2"
                          />
                          {leader.user.name}
                        </div>
                      </td>
                      <td className=" border-t-2 font-medium  px-8 py-4 border-[#CDCCEE]    ">
                        <div>{leader.user.asal_instansi}</div>
                      </td>
                      <td className=" border-t-2 text-center  font-medium px-8 py-4 border-[#CDCCEE]   ">
                        {leader.score}
                      </td>
                      <td className="w border-t-2 text-center font-medium px-8  py-4 border-[#CDCCEE]  ">
                        {index + 1}
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

export default Star;
