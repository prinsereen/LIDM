import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { profile, user, cover, play, paper, bot } from "../assets";
import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import Navbar from "./Navbar";
import axios from "axios";

const Audio = () => {
  const [fileData, setFileData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);

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

  useEffect(() => {
    // Retrieve the profile name from local storage on page load
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfileName && storedProfilePhoto) {
      setProfileName(storedProfileName);
      setProfilePhoto(storedProfilePhoto);
    }
  }, []);

  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = e.target.prompt.value;
    e.target.reset();

    const userStripe = {
      isAi: false,
      value: userMessage,
    };

    setChatHistory((prevHistory) => [...prevHistory, userStripe]);

    const options = {
      method: "POST",
      url: "https://chatgpt-api7.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "chatgpt-api7.p.rapidapi.com",
      },
      data: {
        query: userMessage,
      },
    };

    try {
      const response = await axios.request(options);
      const botMessage = response.data.response;

      const botStripe = {
        isAi: true,
        value: botMessage,
      };

      setChatHistory((prevHistory) => [...prevHistory, botStripe]);
    } catch (error) {
      console.error(error);
    }
  };

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
              <img src={profilePhoto} alt="profile" className="w-16 h-16" />
              <Link to="/profile">
                <h1 className="px-5">{profileName}</h1>
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
          <div className="bg-white w-[25%] h-[500px] fixed right-5 bottom-0 flex flex-col ">
            <h1 className="text-3xl absolute top-3 w-full text-center">
              ChatGPT
            </h1>
            <div className="flex flex-col justify-start items-start h-[320px] gap-2 px-5 my-20 overflow-y-auto">
              {chatHistory.map((stripe, idx) => (
                <div
                  key={idx}
                  className={`flex items-start ${
                    stripe.isAi ? "bg-gray-200" : "bg-blue-200"
                  } p-2 rounded-lg w-full  `}
                >
                  <div className="flex  justify-center items-start">
                    <img
                      src={stripe.isAi ? bot : profilePhoto}
                      alt={stripe.isAi ? "bot" : "user"}
                      className="w-8 h-8 my-1 mx-3"
                    />
                  </div>
                  <div className="max-w-[80%]">{stripe.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center absolute bottom-5 items-center w-full">
              <form onSubmit={handleSubmit}>
                <textarea
                  name="prompt"
                  rows="1"
                  cols="30"
                  wrap="hard"
                  placeholder="Ketikkan pertanyaan"
                  className="py-2 px-3 shadow-lg border-2"
                ></textarea>
                <button type="submit">
                  <img src={paper} className="m-1" alt="paper" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audio;
