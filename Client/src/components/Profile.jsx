import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  calender,
  flag,
  book,
  cover,
  gold,
  bronze,
  silver,
  trophy,
} from "../assets";
import { useContext } from "react";
import { ProfileContext } from "../app/ProfileContext";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);
  const { profileName, profilePhoto, setProfileName, setProfilePhoto } =
    useContext(ProfileContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lidm-production.up.railway.app/users/${id}`
        );

        setData(response.data);

        setProfileName(response.data.name);
        // Save the profile name to local storage
        localStorage.setItem("profileName", response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        if (data) {
          const response = await axios.get(
            `https://lidm-production.up.railway.app/userphoto/${id}`,
            {
              responseType: "blob",
            }
          );
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = function () {
            var base64data = reader.result;
            // console.log(base64data);

            setProfilePhoto(base64data);
            // Save the profile name to local storage
            localStorage.setItem("profilePhoto", base64data);
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFileData();
  }, [id, data]);

  if (!data || !data.rek_description) {
    // Render a loading state or return null if data is not available yet
    return null;
  }

  const {
    name,
    sains,
    sosial,
    seni,
    sastra,
    bahasa,
    rek_description,
    rekomendasi_kompetisi,
  } = data;

  const totalBooksRead =
    parseInt(sains) +
    parseInt(sosial) +
    parseInt(seni) +
    parseInt(sastra) +
    parseInt(bahasa);

  let proficiencyLevel;
  let proficiencyImage;
  if (totalBooksRead < 10) {
    proficiencyLevel = "Pemula";
    proficiencyImage = bronze;
  } else if (totalBooksRead < 20) {
    proficiencyLevel = "Menengah";
    proficiencyImage = silver;
  } else {
    proficiencyLevel = "Kutu Buku";
    proficiencyImage = gold;
  }

  return (
    <section className="w-full h-full flex justify-start">
      <Navbar />
      <div className="ml-72 mr-40 flex flex-col w-full">
        <h1 className="my-[30px] font-bold text-[40px]">Profile</h1>
        <div className="flex w-full gap-10">
          <div className="w-[50%]  bg-white rounded-xl p-5">
            <h1 className=" font-semibold text-[24px]">Literasiku</h1>
            <div className="bg-[#939FB1] h-[1px] w-full" />
            <div className="flex items-center  h-28 w-full bg-[#F4F4F4] rounded-md my-5 shadow-lg outline-1 outline-gray-200">
              <img src={cover} className="w-16 h-16 m-5" />
              <div className="flex flex-col gap-3 font-semibold">
                <h1>Sains</h1>
                <div className="flex gap-2">
                  <img src={book} />
                  {sains} bacaan
                </div>
              </div>
            </div>
            <div className="flex items-center  h-28 w-full bg-[#F4F4F4] rounded-md my-5 shadow-lg outline-1 outline-gray-200">
              <img src={cover} className="w-16 h-16 m-5" />
              <div className="flex flex-col gap-3 font-semibold">
                <h1>Sosial</h1>
                <div className="flex gap-2">
                  <img src={book} />
                  {sosial} bacaan
                </div>
              </div>
            </div>
            <div className="flex items-center  h-28 w-full bg-[#F4F4F4] rounded-md my-5 shadow-lg outline-1 outline-gray-200">
              <img src={cover} className="w-16 h-16 m-5" />
              <div className="flex flex-col gap-3 font-semibold">
                <h1>Seni</h1>
                <div className="flex gap-2">
                  <img src={book} />
                  {seni} bacaan
                </div>
              </div>
            </div>
            <div className="flex items-center  h-28 w-full bg-[#F4F4F4] rounded-md my-5 shadow-lg outline-1 outline-gray-200">
              <img src={cover} className="w-16 h-16 m-5" />
              <div className="flex flex-col gap-3 font-semibold">
                <h1>Sastra</h1>
                <div className="flex gap-2">
                  <img src={book} />
                  {sastra} bacaan
                </div>
              </div>
            </div>
            <div className="flex items-center  h-28 w-full bg-[#F4F4F4] rounded-md my-5 shadow-lg outline-1 outline-gray-200">
              <img src={cover} className="w-16 h-16 m-5" />
              <div className="flex flex-col gap-3 font-semibold">
                <h1>Bahasa</h1>
                <div className="flex gap-2">
                  <img src={book} />
                  {bahasa} bacaan
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%]  bg-white rounded-xl flex flex-col justify-between gap-3 items-center px-5 py-10">
            <div className="w-full flex flex-col items-center gap-3  ">
              <img src={profilePhoto} className="h-24 w-24" />
              <h1 className="font-semibold text-2xl">{profileName}</h1>

              <div className="flex gap-2 text-lg">
                <img src={proficiencyImage} />
                <div
                  className={`text-white px-3 py-1 rounded-md font-semibold ${
                    proficiencyLevel === "Pemula"
                      ? "bg-[#6172A7]"
                      : proficiencyLevel === "Menengah"
                      ? "bg-[#8BE9FD]"
                      : "bg-[#33DF8D]"
                  }`}
                >
                  {proficiencyLevel}
                </div>
              </div>
              <div className="h-[2px] bg-[#939FB1] w-full my-3" />
            </div>
            {rekomendasi_kompetisi !== -1 ? (
              <div className="flex flex-col gap-3 items-center  w-full">
                <h1 className="flex justify-center items-center bg-[#82B3FF] w-[70%] h-14 rounded-xl font-semibold text-white text-xl">
                  Rekomendasi Kompetisi
                </h1>
                <img
                  src={trophy}
                  className="h-[35%] w-[50%] object-contain my-3 shadow-lg"
                />
                <h1 className="flex justify-center items-center rounded-lg font-bold bg-[#E5EFFF] text-sm h-12 w-[50%]">
                  {rek_description.nama_kompetisi}
                </h1>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 ">
                    <img src={calender} />
                    <h1 className="text-xs">
                      {rek_description.tanggal_penyelanggaraan}
                    </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <img src={flag} />
                    <h1 className="text-xs">{rek_description.tingkat}</h1>
                  </div>
                </div>
                <Link
                  to="https://pusatprestasinasional.kemdikbud.go.id/jenjang/smp"
                  className=" h-6 w-20 py-1 text-center bg-[#82B3FF] font-semibold text-white text-xs rounded-md"
                >
                  Detail
                </Link>
              </div>
            ) : (
              <h1 className="font-bold text-2xl text-center ">
                Belum ada rekomendasi kompetisi. <br />
                Ayo mulai membaca !! <br />
              </h1>
            )}
            <div className="w-full flex flex-col items-center">
              <div className="h-[2px] bg-[#939FB1] w-full my-3" />
              <Link
                to={`/profile/edit/${id}`}
                className="flex items-center justify-center h-10 w-[30%] bg-[#0868F9] font-bold text-white text-base rounded-md"
              >
                <button>Edit Profil</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
