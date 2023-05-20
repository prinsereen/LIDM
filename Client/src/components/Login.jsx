import { logo1, logo2, logo3 } from "../assets";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/profile");
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <section className="h-full w-full flex justify-evenly overflow-hidden">
      <div className="mx-[103px] my-[47px] h-full w-[50%] bg-tertiary flex flex-col  items-center rounded-xl">
        <div className="flex flex-col items-center   font-sans  text-white">
          <Link to="/" className="">
            <img
              src={logo1}
              className="w-[120px] h-[120px] mt-10 mb-[30px]  "
            />
          </Link>
          <h1 className=" text-4xl px-36  font-bold text-center">
            Selamat Datang. Salam Literasi!
          </h1>
          <h1 className=" text-4xl"></h1>
          <p className=" px-20 mt-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            et metus euismod, cursus metus ac, varius orci..
          </p>
          <div className="flex items-center justify-center bg-white w-[517px] h-[109px] mt-[150px] mb-[42px] rounded-xl">
            <img src={logo2} className=" p-2" />
            <img src={logo3} className="" />
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col justify-start my-[50px] mb-[50px] mt-[30px] ">
        <h1 className="text-[50px] text-center font-bold mr-[20px] mt-[50px]">
          Masuk
        </h1>
        <h2 className="text-left text-[30px] text-[#939FB1] font-bold pl-3">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#3887FF] px-1">
            Buat Akun
          </Link>
        </h2>
        <form
          onSubmit={handleSubmit}
          className=" text-[25px] font-bold mr-[90px]"
        >
          <div className="mt-2" />
          <label>Email</label>
          <br />
          <input
            name="email"
            type="email"
            id="email"
            placeholder="alamat email"
            className="w-full bg-white py-3 px-5 rounded-xl text-[#939FB1] text-[20px] focus:text-black"
          />
          <div className="mt-2" />
          <label>Sandi</label>
          <br />
          <input
            name="password"
            type="password"
            id="password"
            placeholder="kata sandi"
            className="w-full bg-white py-3 px-5 rounded-xl text-[#939FB1] text-[20px] focus:text-black"
          />

          <input
            value="Masuk"
            type="submit"
            className="bg-[#0868F9] px-10 py-3 mt-8 rounded-lg text-[white] text-[20px]"
          />

          <h2 className="text-left text-[20px] text-[#939FB1] font-bold mt-3">
            Terdapat kendala?{" "}
            <Link to="/" className="text-[#3887FF] px-1">
              Hubungi kami
            </Link>
          </h2>
        </form>
      </div>
    </section>
  );
};

export default Login;