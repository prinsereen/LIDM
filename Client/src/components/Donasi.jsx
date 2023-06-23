import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { diterima, ditolak, draft, donate, notebook } from "../assets";
import { logOut, reset, getMe } from "../state/index.js";
import { logo } from "../assets";
import axios from "axios";

const Donasi = () => {
  const [donasi, setDonasi] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Files");

        const donasiData = response.data.map((item) => {
          return {
            ...item,
            createdAt: item.createdAt, // Assuming you have the getDate function defined
          };
        });
        console.log(donasiData);

        setDonasi(donasiData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getDate = (date) => {
    const datetimeString = date;
    const dateId = new Date(datetimeString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = dateId.toLocaleDateString(["ban", "id"], options);

    return formattedDate;
  };

  const countDiterima = donasi.reduce((count, item) => {
    if (item.status === "Diterima") {
      return count + 1;
    }
    return count;
  }, 0);
  const countDraft = donasi.reduce((count, item) => {
    if (item.status === "Draft") {
      return count + 1;
    }
    return count;
  }, 0);
  const countDitolak = donasi.reduce((count, item) => {
    if (item.status === "Ditolak") {
      return count + 1;
    }
    return count;
  }, 0);

  const getStatusColor = (status) => {
    if (status === "Diterima") {
      return "bg-[#66FAB3]";
    } else if (status === "Ditolak") {
      return "bg-[#FFA48F]";
    } else if (status === "Draft") {
      return "bg-[#FDFFA7]";
    } else {
      return "";
    }
  };

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        <div className="flex flex-col items-center gap-2">
          <Link to={`/donatur/${id}`}>
            <img src={logo} className=" ml-4" />
          </Link>
          <div className="bg-black h-[1px] w-32 " />
          <img src={notebook} className="mt-6" />
        </div>

        <button onClick={logout} className=" mt-48">
          <svg width="45" height="45" fill="none" className="">
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
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Buat Ringkasan</h1>
          </div>
         
        </div>
        <div className="h-full w-[1000px] mt-10 rounded-md bg-white">
          <div className="flex flex-col items-start justify-center cursor-text px-[65px] py-[22px]">
            <p className="font-bold text-xl mb-5">Ringkasan</p>
            <div className="mb-6 w-full">
              <label className="text-xl mb-2" htmlFor="title">
                Judul <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Judul Ringkasan"
                className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-6 w-full">
              <label className="text-xl mb-2" htmlFor="content">
                Konten <span className="text-red-600">*</span>
              </label>
              <div className="border border-[#0868F9] mb-5">
                
              </div>
              <div className="flex items-center justify-end">
                <button
                  // onClick={handleReset}
                  className="rounded-md text-white bg-[#0868F9] px-8 py-4 mr-6 h-14 w-28 font-semibold"
                >
                  Reset
                </button>
                <button
                  // onClick={handleSendSummary}
                  className="rounded-md text-white bg-[#0868F9] px-8 py-4 h-14 w-28 font-semibold"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Donasi;
