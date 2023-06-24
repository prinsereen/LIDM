import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { profile, user } from "../assets";
import { Document, Page, pdfjs } from "react-pdf";
import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import Navbar from "./Navbar";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Book = () => {
  const [fileData, setFileData] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } = useContext(ProfileContext);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Pdf/${id}`, {
          responseType: "blob",
        });
        // var file = new File([response.data], "name");
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          // console.log(base64data);
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

  useEffect(() => {
    // Retrieve the profile name from local storage on page load
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfileName && storedProfilePhoto) {
      setProfileName(storedProfileName);
      setProfilePhoto(storedProfilePhoto);

    }
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
            <button className="bg-[#0868F9] rounded-lg my-10 h-12 w-44  text-white">
              Buat Ringkasan
            </button>
          </Link>
          <div className="flex mt-10 gap-5">
          <object
            data={`${fileData}#toolbar=0`}
            type="application/pdf"
            className="h-screen w-[60%] "
          >
            {/* <p>
              Alternative text - include a link{" "}
              <a href="http://africau.edu/images/default/sample.pdf">
                to the PDF!
              </a>
            </p> */}
          </object>
          <div className="bg-white w-w-40 h-[600px] fixed r-10">

          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
