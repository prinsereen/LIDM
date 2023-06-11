import { useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profile } from "../assets";
import { useState } from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Summary = () => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const fileId = useParams();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);
  const data = {
    summary: convertedContent,
    fileId: fileId.id,
  };
  const handleSendSummary = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/Summary`, data, {
        "Content-Type": "application/json",
      });
      if (response) {
        navigate(`/read/kategori1/book/${fileId.id}`);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(""))
    );
  };

  return (
    <div>
      <Navbar />
      <div className="px-72 flex flex-col overflow-hidden">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Buat Ringkasan</h1>
          </div>
          <div className="flex mt-9  items-center  ">
            <img src={profile} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">Yusnita</h1>
            </Link>
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <label className="text-xl mb-2" htmlFor="total_page">
                Jumlah Halaman Dibaca <span className="text-red-600">*</span>
              </label>
              <input
                id="total_page"
                type="number"
                placeholder="Judul Ringkasan"
                className="rounded-md px-5 py-3 border border-[#0868F9] w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <label className="text-xl mb-2" htmlFor="content">
                Konten <span className="text-red-600">*</span>
              </label>
              <div className="border border-[#0868F9] mb-5">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  toolbarClassName="border-b border-b-[#0868F9]"
                  editorClassName="px-5  h-[514px]"
                  //   editorState={editorState}
                  //   onEditorStateChange={handleEditorStateChange}
                  placeholder="write something !"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={handleReset}
                  className="rounded-md text-white bg-[#0868F9] px-8 py-4 mr-6 h-14 w-28 font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={handleSendSummary}
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

export default Summary;
