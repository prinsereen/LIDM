import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profile, user, cover, play, logo, library } from "../assets";
import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import { logOut, reset, getMe } from "../state/index.js";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";

const AdminAudio = () => {
  const [fileData, setFileData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(
          `https://lidm-production.up.railway.app/Mp3/${id}`,
          {
            responseType: "blob",
          }
        );
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
        const response = await axios.get(
          `https://lidm-production.up.railway.app/Files/${id}`
        );
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

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        <div className="flex flex-col items-center gap-2">
          <Link to={`/admin/${id}`}>
            <img src={logo} className=" ml-4" />
          </Link>
          <div className="bg-black h-[1px] w-32 " />
          <img src={library} className="mt-6" />
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
          </div>

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

export default AdminAudio;
