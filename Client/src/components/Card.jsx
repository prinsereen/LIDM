import React from "react";
import { read } from "../assets";
import { Link } from "react-router-dom";

const Card = ({ file }) => {
  return (
    <Link to={`/read/kategori1/book/${file.uuid}`}>
      <div className="w-64 h-80 bg-white rounded-lg flex flex-col items-center justify-center cursor-pointer">
        <img
          src={read}
          alt="read"
          className="w-80 h-52 mt-3 object-cover pt-5 "
        />
        <h1 className=" rounded-lg w-28  flex justify-center items-center text-sm font-bold">
          {file.title}
        </h1>
        <div className="w-auto">
          <div className="bg-[#D9D9D9] h-[1px] w-56" />
        </div>
        <p className="w-auto text-sm mx-10 my-3">
          Lorem ipsum dolor sit amet consectetur. Nec feugiat adipiscing tempus
          pulvinar sit
        </p>
        <div className="w-auto mb-10">
          <div className="bg-[#D9D9D9] h-[1px] w-56" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
