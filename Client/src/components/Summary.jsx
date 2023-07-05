import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { ProfileContext } from "../app/ProfileContext";
import { profile } from "../assets";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// eslint-disable-next-line react/prop-types
const Summary = () => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [kategori, setKategori] = useState();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const fileId = useParams();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);
  const [id, setId] = useState();

  useEffect(() => {
    const handleCopyCutPaste = (e) => {
      e.preventDefault();
    };

    document.addEventListener("copy", handleCopyCutPaste);
    document.addEventListener("cut", handleCopyCutPaste);
    document.addEventListener("paste", handleCopyCutPaste);

    return () => {
      document.removeEventListener("copy", handleCopyCutPaste);
      document.removeEventListener("cut", handleCopyCutPaste);
      document.removeEventListener("paste", handleCopyCutPaste);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://lidm-production.up.railway.app/me"
        );
        setId(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lidm-production.up.railway.app/users/${id.uuid}`
        );

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lidm-production.up.railway.app/Files/${fileId.id}`
        );

        setKategori(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [fileId]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const handleSendSummary = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://lidm-production.up.railway.app/Summary`,
        { summary: convertedContent, uuid: fileId.id },
        {
          "Content-Type": "application/json",
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    try {
      if (user) {
        const updatedData = {
          seni: kategori.classification === "Seni" ? user.seni + 1 : user.seni,
          sosial:
            kategori.classification === "Sosial"
              ? user.sosial + 1
              : user.sosial,
          sains:
            kategori.classification === "Sains" ? user.sains + 1 : user.sains,
          sastra:
            kategori.classification === "Sastra"
              ? user.sastra + 1
              : user.sastra,
          bahasa:
            kategori.classification === "Bahasa"
              ? user.bahasa + 1
              : user.bahasa,
        };
        if (updatedData) {
          const response = await axios.patch(
            `https://lidm-production.up.railway.app/userrec/${id.uuid}`,
            updatedData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(
        `https://lidm-production.up.railway.app/gettotal`
      );
      if (response) {
        navigate(`/read/kategori1/book/${fileId.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleReset = () => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(""))
    );
  };

  useEffect(() => {
    // Retrieve the profile name from local storage on page load
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfileName && storedProfilePhoto) {
      setProfileName(storedProfileName);
      setProfilePhoto(storedProfilePhoto);
    }
  }, []);

  const handlePastedText = (text, html) => {
    // Prevent pasting of text and HTML content
    return true;
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
            <img src={profilePhoto} alt="profile" className="w-16 h-16" />
            <Link to="/profile">
              <h1 className="px-5">{profileName}</h1>
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
              <label className="text-xl mb-2">
                Konten <span className="text-red-600">*</span>
              </label>
              <div className="border border-[#0868F9] mb-5">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  handlePastedText={handlePastedText}
                  toolbarClassName="border-b border-b-[#0868F9]"
                  editorClassName="px-5  h-[514px]"
                  placeholder="write something !"
                />
              </div>
              <div className="flex  items-center justify-end">
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
        {/* Show spinner while loading */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
