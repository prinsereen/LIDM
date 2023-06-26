import { logo, picture, bubble, bubble2 } from "../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full h-full overflow-hidden ">
      <nav className="w-full flex items-center p-5 fixed top-0  bg-primary">
        <img src={bubble} alt="bubble" className="absolute top-0 left-0 z-2" />
        <img
          src={logo}
          alt="logo"
          className="absolute top-10 left-10 w-13 h-13 object-cover z-1 "
        />
        <Link
          to="/login"
          className=" flex flex-1 justify-end items-center gap-5 mx-10 text-xl"
        >
          Masuk
        </Link>
        <Link
          to="/register"
          className="flex justify-end mr-20 text-xl px-5 border-2 rounded-md border-black "
        >
          Daftar
        </Link>
      </nav>
      <section className="flex flex-row">
        <div className="relative inset-0 top-[220px] max-w-7xl mx-auto  flex flex-col items-start z-1">
          <h1 className="text-[80px] font-bold">LITERATUR</h1>
          <p className="text-[30px]">Digitalisasi Gerakan Literasi Sekolah</p>
        </div>
        <img
          src={bubble2}
          alt="picture"
          className="fixed right-0 top-60  z-0"
        />
        <img
          src={picture}
          alt="picture"
          className="relative right-24 top-12 w-[100vh] h-[70vh] object-contain  z-1"
        />
      </section>
      <footer className="fixed w-full bottom-0 h-16 bg-tertiary " />
    </div>
  );
};
<nav></nav>;

export default Hero;
