import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { profile, user, cover, play } from "../assets";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Audio = () => {
  const [fileData, setFileData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Mp3/${id}`, {
          responseType: "blob",
        });
        // var file = new File([response.data], "name");
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          setFileData(base64data);
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchFileData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Files/${id}`);
        const datetimeString = await response.data.createdAt;
        const dateId = new Date(datetimeString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = dateId.toLocaleDateString(["ban", "id"], options);
        setDate(formattedDate);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (audioRef.current) {
      switch (event.key) {
        case "ArrowRight":
          audioRef.current.currentTime += 5;
          break;
        case "ArrowLeft":
          audioRef.current.currentTime -= 5;
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        handlePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {fileData && (
        <div className="ml-60 flex flex-col overflow-hidden">
          <div className="flex justify-start w-full h-auto ">
            <div className="mt-12 w-3xl">
              <h1 className="font-bold text-4xl">{data.title}</h1>
              <h1 className=" text-xl flex items-center">
                <img src={user} className="p-1" /> {data.author} &bull;{" "}
                {data.classification} &bull; {date}
              </h1>
              {/* <h1 className=" text-xl">Kategori: {data.classification}</h1> */}
            </div>
            <div className="flex mt-9 ml-52 items-center absolute right-20 ">
              <img src={profile} alt="profile" className="w-16 h-16" />
              <Link to="/profile">
                <h1 className="px-5">Yusnita</h1>
              </Link>
            </div>
          </div>
          <Link
            to={`/read/kategori1/book/ringkasan/${id}`}
            className="h-12 w-44 mb-10"
          >
            <button className="bg-[#0868F9] rounded-lg my-10 h-12 w-44 text-white font-bold">
              Buat Ringkasan
            </button>
          </Link>

          <div className="bg-gradient-to-b from-[#3887FF] to-[#BDD7FF] w-[782px] h-[311px] mt-10 p-10  rounded-xl flex items-center justify-between shadow-lg ">
            <div className="flex">
              <img src={cover} className="mx-5 drop-shadow-lg ml-12" />
              <div className="flex flex-col">
                <h1 className="font-bold text-xl mt-1 text-[#3B3A5B]">
                  {data.title}
                </h1>
                <h1 className=" text-sm flex items-center ">
                  {data.author} &bull; {data.classification} &bull; {date}
                </h1>
                <div className="h-[1px] w-72 my-3 bg-white" />
                <p className="text-sm max-w-xs mb-2">
                  Lorem ipsum dolor sit amet consectetur. Nec feugiat adipiscing
                  tempus pulvinar sit.{" "}
                </p>
                <audio
                  src={`${fileData}#toolbar=0`}
                  controls
                  className="mt-10"
                  ref={audioRef}
                />
              </div>
            </div>
            <img
              src={play}
              onClick={handlePlayPause}
              className="self-start cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Audio;
