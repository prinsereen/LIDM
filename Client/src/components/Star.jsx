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
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle ">
              <div className="overflow-hidden h-full w-full bg-white mt-10 rounded-xl">
                <table className=" h-full w-full bg-white  m-10 ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="bg-white   text-left px-8 py-4 "
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="bg-white text-left px-8 py-4 "
                      >
                        Asal Sekolah
                      </th>
                      <th
                        scope="col"
                        className="bg-white  text-left px-8 py-4 "
                      >
                        Nilai
                      </th>
                      <th
                        scope="col"
                        className="bg-white  text-left px-8 py-4 "
                      >
                        Peringkat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white border-collapse  divide-y divide-gray-200 ">
                    {leaderboard.map((leader, index) => {
                      if (index < 5) {
                        return (
                          <tr key={index} >
                            <td className=" border-t-2 px-8 py-4 border-[#CDCCEE] bg-[#F4F4F4]   ">
                              <div>{leader.user.name}</div>
                            </td>
                            <td className=" border-t-2  px-8 py-4 border-[#CDCCEE] bg-[#F4F4F4]    ">
                              <div>{leader.user.asal_instansi}</div>
                            </td>
                            <td className=" border-t-2  px-8 py-4 border-[#CDCCEE] bg-[#F4F4F4]  ">
                              {leader.score}
                            </td>
                            <td className="w border-t-2  px-8 py-4 border-[#CDCCEE] bg-[#F4F4F4]  ">
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
        </div>
      </div>
    </div>
  );
};

export default Star;
