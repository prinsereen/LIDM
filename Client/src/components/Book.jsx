import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { profile, user, paper, bot } from "../assets";
import { Document, Page, pdfjs } from "react-pdf";
import { ProfileContext } from "../app/ProfileContext";
import Navbar from "./Navbar";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Book = () => {
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
          `https://lidm-production.up.railway.app/Pdf/${id}`,
          {
            responseType: "blob",
          }
        );
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
        const datetimeString = response.data.createdAt;
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

  useEffect(() => {
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
              <h1 className="text-xl flex items-center">
                <img src={user} className="p-1" alt="user" /> {data.author}{" "}
                &bull; {data.classification} &bull; {date}
              </h1>
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
            <button className="bg-[#0868F9] rounded-lg my-10 h-12 w-44 text-white">
              Buat Ringkasan
            </button>
          </Link>
          <div className="flex mt-10 gap-5">
            <object
              data={`${fileData}#toolbar=0`}
              type="application/pdf"
              className="h-screen w-[65%]"
            ></object>
            <div className="bg-white w-[25%] h-[500px] fixed right-5 flex flex-col ">
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
              <div className="flex gap-3 justify-center absolute bottom-10 items-center w-full">
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
        </div>
      )}
    </div>
  );
};

export default Book;
