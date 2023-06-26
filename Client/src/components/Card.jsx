/* eslint-disable react/prop-types */
import React from "react";
import { read, listen } from "../assets";
import { Link } from "react-router-dom";

const Card = ({ file, type }) => {
  return (
    <div className="w-64 h-80 bg-white rounded-lg flex flex-col items-center justify-center cursor-pointer">
      <img
        src={type == "listen" ? listen : read}
        alt="read"
        className="w-80 h-52 mt-3 object-cover pt-5 "
      />
      <h1 className=" rounded-lg w-28 text-center flex justify-center items-center text-sm font-bold">
        {file.title}
      </h1>
      <div className="w-auto">
        <div className="bg-[#D9D9D9] h-[1px] w-56" />
      </div>
      <p className="w-auto text-sm mx-10 my-3">
        {type == "listen" ? (
          <p> Mari berliterasi dengan audiobook menarik pilihanmu </p>
        ) : (
          <p>Mari berliterasi dengan bacaan menarik pilihanmu </p>
        )}
      </p>
      <div className="w-auto mb-10">
        <div className="bg-[#D9D9D9] h-[1px] w-56" />
      </div>
    </div>
  );
};

export default Card;
