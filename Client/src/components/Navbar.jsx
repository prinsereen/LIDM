import { useState, useEffect } from "react";
import { logo } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, reset, getMe } from "../state/index.js";
import axios from "axios";

const Navbar = () => {
  const [active, setActive] = useState("");
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const firstPath = pathSegments[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lidm-production.up.railway.app/me"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    setActive(firstPath);
  }, []);

  return (
    <div className="flex flex-col items-center fixed h-full w-40 bg-white">
      <Link
        to={`/profile/${data.uuid}`}
        onClick={() => {
          setActive("profile");
          window.scrollTo(0, 0);
        }}
      >
        <img src={logo} className="mt-9 ml-4" />
      </Link>
      <div className="bg-black h-[1px] w-32 mt-6" />
      <Link
        to={`/profile/${data.uuid}`}
        onClick={() => {
          setActive("profile");
        }}
        className=" mt-8"
      >
        <svg
          width="45"
          height="45"
          fill={`${active === "profile" ? "blue" : "black"}`}
        >
          <path d="M16.875 20.625a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0-11.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5ZM31.875 24.375a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25Zm0-7.5a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75ZM31.875 26.25a9.375 9.375 0 0 0-5.738 1.969A13.125 13.125 0 0 0 3.75 37.5a1.875 1.875 0 1 0 3.75 0 9.375 9.375 0 0 1 18.75 0 1.875 1.875 0 1 0 3.75 0 12.938 12.938 0 0 0-1.613-6.281 5.625 5.625 0 0 1 9.113 4.406 1.875 1.875 0 1 0 3.75 0 9.375 9.375 0 0 0-9.375-9.375Z" />
        </svg>
      </Link>
      <Link
        to={`/read/${data.uuid}`}
        onClick={() => {
          setActive("read");
        }}
        className=" mt-8"
      >
        <svg
          width="45"
          height="45"
          fill={`${active === "read" ? "blue" : "black"}`}
          className=""
        >
          <path d="M38.663 7.912a1.875 1.875 0 0 0-1.575-.375L22.5 10.82 7.913 7.499a1.875 1.875 0 0 0-2.288 1.876V32.25a1.875 1.875 0 0 0 1.463 1.875l15 3.375h.825l15-3.375a1.874 1.874 0 0 0 1.462-1.875V9.375a1.874 1.874 0 0 0-.712-1.463ZM9.375 11.72l11.25 2.53v19.032L9.375 30.75V11.719Zm26.25 19.03-11.25 2.532V14.25l11.25-2.531v19.03Z" />
        </svg>
      </Link>
      <Link
        to={`/star/${data.uuid}`}
        onClick={() => {
          setActive("star");
        }}
        className=" mt-8"
      >
        <svg
          width="45"
          height="45"
          fill={`${active === "star" ? "blue" : "black"}`}
          className=""
        >
          <path d="M32.925 39.375c-.3.001-.596-.07-.862-.206L22.5 34.162l-9.563 5.007a1.875 1.875 0 0 1-2.718-1.988l1.875-10.556-7.725-7.5A1.875 1.875 0 0 1 3.9 17.25a1.875 1.875 0 0 1 1.519-1.275l10.687-1.556 4.706-9.62a1.874 1.874 0 0 1 3.375 0l4.763 9.6 10.688 1.557a1.876 1.876 0 0 1 1.518 1.275 1.876 1.876 0 0 1-.468 1.875l-7.726 7.5 1.875 10.556a1.875 1.875 0 0 1-.75 1.875c-.339.238-.748.357-1.162.338ZM22.5 30.187c.3-.007.598.064.863.207l7.068 3.75-1.35-7.894a1.876 1.876 0 0 1 .544-1.669l5.625-5.494-7.875-1.162a1.875 1.875 0 0 1-1.331-1.05L22.5 9.844l-3.544 7.03a1.874 1.874 0 0 1-1.406 1.013L9.675 19.05l5.625 5.494a1.875 1.875 0 0 1 .544 1.668l-1.35 7.8 7.069-3.75c.299-.111.624-.137.937-.075Z" />
        </svg>
      </Link>
      <Link
        to={`/history/${data.uuid}`}
        onClick={() => {
          setActive("history");
        }}
        className=" mt-8"
      >
        <svg
          width="45"
          height="45"
          fill={`${active === "history" ? "blue" : "black"}`}
          className=""
        >
          <path d="M22.5 3.75a18.75 18.75 0 1 0 0 37.5 18.75 18.75 0 0 0 0-37.5Zm0 33.75a15 15 0 1 1 0-29.998 15 15 0 0 1 0 29.998Z" />
          <path d="M30 20.625h-5.625V15a1.875 1.875 0 1 0-3.75 0v7.5a1.875 1.875 0 0 0 1.875 1.875H30a1.875 1.875 0 1 0 0-3.75Z" />
        </svg>
      </Link>

      <button onClick={logout} className=" mt-48">
        <svg width="45" height="45" fill="none" className="">
          <path
            stroke="#3B3A5B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M29.5 2H37a5 5 0 0 1 5 5v30a5 5 0 0 1-5 5h-7.5M12 12 2 22l10 10M2 22h30"
          />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
