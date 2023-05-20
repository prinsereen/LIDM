import Navbar from "./Navbar";

import React from "react";

const Read = () => {
  return (
    <>
      <Navbar />
      <div className="ml-72 flex flex-col overflow-hidden">
        <div className="flex justify-start w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Baca</h1>
            <p className="max-w-3xl">
              Halo, Sobat Literasi! Lorem ipsum dolor sit amet consectetur. Nec
              feugiat adipiscing tempus pulvinar sit.{" "}
            </p>
            <p>Silahkan pilih format bacaan yang kamu inginkan.</p>
          </div>
          <div className="flex mt-9 ml-52 ">
            <img src="profile" alt="profile" />
            <h1 className="px-5">Yusnita</h1>
          </div>
        </div>
        <div className="flex my-8 mb-10  w-full h-[520px]">
          <div className="w-[40%] h-[100%] mr-10 bg-white rounded-lg flex flex-col items-center justify-center"></div>
          <div className="w-[40%] h-[100%] mr-10 bg-white rounded-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Read;
