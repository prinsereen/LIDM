import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { profile } from "../assets";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Book = () => {
  const [fileData, setFileData] = useState(null);
  const { id } = useParams();
  const [pdfPath, setPdfPath] = useState("");

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/Pdf/${id}`, {
          responseType: 'blob'
        });
        // var file = new File([response.data], "name");
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          console.log(base64data);
          setFileData(base64data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFileData();
  }, [id]);

  return (
    <div>
      <Navbar />
      {fileData && (
        <div className="ml-72 flex flex-col overflow-hidden">
          <div className="flex justify-start w-full h-auto ">
            <div className="mt-12 w-3xl">
              <h1 className="font-bold text-4xl">{fileData.title}</h1>
            </div>
            <div className="flex mt-9 ml-52 items-center absolute right-20 ">
              <img src={profile} alt="profile" className="w-16 h-16" />
              <Link to="/profile">
                <h1 className="px-5">Yusnita</h1>
              </Link>
            </div>
          </div>
          {/* {fileData.type.includes("application/pdf") && (
            <embed
              // src={URL.createObjectURL(fileData)}
              src={fileData}
              width="500"
              height="600"
              type="application/pdf"
            />
          )} */}
          <object data={fileData} type="application/pdf" className="h-screen">
            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
          </object>
          {/* <Document file={pdfPath}>
            <Page />
          </Document> */}
        </div>
      )}
    </div>
  );
};

export default Book;
