import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { profile, read, listen } from "../assets";

const Read = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="ml-72 flex flex-col overflow-hidden">
        <div className="flex justify-start w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Baca</h1>
            <p className="max-w-3xl">
              Halo, Sobat Literasi! Lorem ipsum dolor sit amet consectetur. Nec
              feugiat adipiscing tempus pulvinar sit.{" "}
            </p>
            <p>Silahkan pilih format bacaan yang kamu inginkan.</p>
          </div>
          <div className="flex mt-9 ml-52 items-center ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
          </div>
        </div>
        <div className="flex my-8 mb-10  w-full h-[520px]">
          <div className="w-[35%] h-[100%] mr-10 bg-white rounded-lg flex flex-col items-center justify-center">
            <img
              src={read}
              alt="read"
              className="w-80 h-52 mt-3 object-cover"
            />
            <h1 className="mt-4 mb-4 bg-primary rounded-lg w-64 h-12 flex justify-center items-center font-bold">
              PDF
            </h1>
            <p className="w-64">
              Lorem ipsum dolor sit amet consectetur. Nec feugiat adipiscing
              tempus pulvinar sit. Sit odio purus pharetra ac.
            </p>
            <button
              onClick={() => navigate("/read/kategori1")}
              className="bg-[#0868F9] text-white w-44 h-12 my-7 rounded-lg"
            >
              Pilih Kategori
            </button>
          </div>
          <div className="w-[35%] h-[100%] mr-10 bg-white rounded-lg flex flex-col items-center justify-center">
            <img
              src={listen}
              alt="read"
              className="w-80 h-52 mt-3 object-cover"
            />
            <h1 className="mt-4 mb-4 bg-primary rounded-lg w-64 h-12 flex justify-center items-center font-bold">
              AudioBook
            </h1>
            <p className="w-64">
              Lorem ipsum dolor sit amet consectetur. Nec feugiat adipiscing
              tempus pulvinar sit. Sit odio purus pharetra ac.
            </p>
            <button
              onClick={() => navigate("/read/kategori2")}
              className="bg-[#0868F9] text-white w-44 h-12 my-7 rounded-lg"
            >
              Pilih Kategori
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;
