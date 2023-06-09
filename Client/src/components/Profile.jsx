import Navbar from "./Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../state/index.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="w-full h-full flex justify-start">
      <Navbar />
      <div className="ml-72 flex flex-col">
        <h1 className="my-[30px] font-bold text-[40px]">Profile</h1>
        <div className="flex">
          <div className="w-[750px] h-[600px] mr-7 bg-white rounded-xl"></div>
          <div className="w-[400px] h-[1000px] mr-7 bg-white rounded-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
