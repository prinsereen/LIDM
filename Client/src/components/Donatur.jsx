import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { diterima, ditolak, draft, donate, notebook } from "../assets";
import { logOut, reset, getMe } from "../state/index.js";
import { logo } from "../assets";
import { useDispatch } from "react-redux";
import axios from "axios";

const Donatur = () => {
  const [donasi, setDonasi] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the subset of data to display on the current page
  const paginatedData = donasi.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lidm-production.up.railway.app/Files"
        );

        const donasiData = response.data.map((item) => {
          return {
            ...item,
            createdAt: item.createdAt, // Assuming you have the getDate function defined
          };
        });
        console.log(donasiData);

        setDonasi(donasiData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getDate = (date) => {
    const datetimeString = date;
    const dateId = new Date(datetimeString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = dateId.toLocaleDateString(["ban", "id"], options);

    return formattedDate;
  };

  const countDiterima = donasi.reduce((count, item) => {
    if (item.status === "Diterima") {
      return count + 1;
    }
    return count;
  }, 0);
  const countDraft = donasi.reduce((count, item) => {
    if (item.status === "Draft") {
      return count + 1;
    }
    return count;
  }, 0);
  const countDitolak = donasi.reduce((count, item) => {
    if (item.status === "Ditolak") {
      return count + 1;
    }
    return count;
  }, 0);

  const getStatusColor = (status) => {
    if (status === "Diterima") {
      return "bg-[#66FAB3]";
    } else if (status === "Ditolak") {
      return "bg-[#FFA48F]";
    } else if (status === "Draft") {
      return "bg-[#FDFFA7]";
    } else {
      return "";
    }
  };

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        <div className="flex flex-col items-center gap-2">
          <Link to={`/donatur/${id}`}>
            <img src={logo} className=" ml-4" />
          </Link>
          <div className="bg-black h-[1px] w-32 " />
          <img src={notebook} className="mt-6" />
        </div>

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
      <div className="flex flex-col ml-32  px-24">
        <div className="flex justify-between w-full h-auto ">
          <div className="mt-12 w-3xl">
            <h1 className="font-bold text-4xl">Donasi Saya</h1>
          </div>
        </div>
        <div className="flex mt-7 gap-5">
          <div className="flex flex-col items-center justify-center h-52 w-[25%] bg-gradient-to-b from-[#66FAB3] to-white">
            <img src={diterima} />
            <h1 className="text-3xl font-bold">{countDiterima}</h1>
            <h1 className="font-semibold text-xl">Diterima</h1>
          </div>
          <div className="flex flex-col items-center justify-center h-52 w-[25%] bg-gradient-to-b from-[#FDFFA7] to-white">
            <img src={draft} />
            <h1 className="text-3xl font-bold">{countDraft}</h1>
            <h1 className="font-semibold text-xl">Draft</h1>
          </div>
          <div className="flex flex-col items-center justify-center h-52 w-[25%] bg-gradient-to-b from-[#FFA48F] to-white">
            <img src={ditolak} />
            <h1 className="text-3xl font-bold">{countDitolak}</h1>
            <h1 className="font-semibold text-xl">Ditolak</h1>
          </div>
          <Link
            to={`/donasi/${id}`}
            className="flex flex-col items-center justify-center h-52 w-[25%] bg-gradient-to-b from-[#3887FF] to-white"
          >
            <img src={donate} />
            <h1 className="font-semibold text-xl">Tambah Donasi</h1>
          </Link>
        </div>
        <div className="bg-white  mt-10 rounded-lg shadow-lg">
          <table className="table-auto h-full w-[95%] mr-10 m-5 rounded-md  ">
            <thead>
              <tr>
                <th className="bg-white border-b-2 text-left px-8 py-4">
                  Judul
                </th>
                <th className="bg-white border-b-2  text-left px-8 py-4">
                  Tanggal
                </th>
                <th className="bg-white border-b-2   text-center px-8 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((don, index) => {
                if (index < 10) {
                  return (
                    <tr key={index} className="hover:bg-[#F4F4F4]">
                      <td className=" px-8 py-4    ">
                        <div>{don.title}</div>
                      </td>
                      <td className=" px-8 py-4  ">
                        <div>{getDate(don.createdAt)}</div>
                      </td>
                      <td className="flex justify-center items-center  px-8 py-4  ">
                        <div
                          className={`${getStatusColor(
                            don.status
                          )} flex justify-center items-center h-[20%] w-[40%] rounded-md`}
                        >
                          {don.status}
                        </div>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {donasi.length > itemsPerPage && (
              <div className="flex items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-l"
                >
                  Previous
                </button>
                <div className="px-3 py-1 bg-blue-500 text-white font-semibold">
                  {currentPage}
                </div>
                <button
                  disabled={endIndex >= donasi.length}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-r"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donatur;
