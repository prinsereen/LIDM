import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profile, user, logo, library } from "../assets";
import { logOut, reset, getMe } from "../state/index.js";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch } from "react-redux";

import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import Navbar from "./Navbar";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AdminBook = () => {
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
          `https://lidm-production.up.railway.app/Pdf/${id}`,
          {
            responseType: "blob",
          }
        );
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

          <object
            data={`${fileData}#toolbar=0`}
            type="application/pdf"
            className="h-screen w-[70%] mt-10"
          >
            {/* <p>
              Alternative text - include a link{" "}
              <a href="http://africau.edu/images/default/sample.pdf">
                to the PDF!
              </a>
            </p> */}
          </object>
        </div>
      )}
    </div>
  );
};

export default AdminBook;
