import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { diterima, ditolak, paper, donate, notebook, library } from "../assets";
import { logOut, reset, getMe } from "../state/index.js";
import { logo } from "../assets";
import { useDispatch } from "react-redux";
import axios from "axios";

const Admin = () => {
  const [donasi, setDonasi] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (event, index) => {
    const { value } = event.target;

    setSelectedValue((prevSelectedValue) => {
      const updatedSelectedValue = [...prevSelectedValue];
      updatedSelectedValue[index] = value;
      return updatedSelectedValue;
    });
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
        // console.log(donasiData);

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

  const countDitolak = donasi.reduce((count, item) => {
    if (item.status === "Ditolak") {
      return count + 1;
    }
    return count;
  }, 0);

  const getStatusColor = (status, selectedValue) => {
    if (selectedValue === "Draft") {
      return "bg-[#FDFFA7]";
    } else if (selectedValue === "Diterima") {
      return "bg-[#66FAB3]";
    } else if (selectedValue === "Ditolak") {
      return "bg-[#FFA48F]";
    } else if (status === "Draft") {
      return "bg-[#FDFFA7]";
    } else if (status === "Diterima") {
      return "bg-[#66FAB3]";
    } else if (status === "Ditolak") {
      return "bg-[#FFA48F]";
    } else {
      return ""; // Return an empty string for the default background color
    }
  };

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  function getFileExtension(filePath) {
    if (!filePath) {
      return null; // Return null if filePath is null or undefined
    }

    const fileExtension = filePath.split(".").pop();
    if (fileExtension === "pdf") {
      return "PDF";
    } else if (fileExtension === "mp3") {
      return "AudioBook";
    } else {
      return null; // Return null for other file extensions or if fileExtension is empty or undefined
    }
  }

  const handleUpdateStatus = async (uuid, classification, status) => {
    try {
      setLoading(true); // Start loading

      const response = await axios.patch(
        `https://lidm-production.up.railway.app/Files/${uuid}`,
        {
          classification,
          status,
        }
      );
      console.log(response.data);
      navigate(`/admin/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-between fixed h-full w-40 bg-white py-10">
        <div className="flex flex-col items-center gap-2">
          <Link to={`/admin/${id}`}>
            <img src={logo} className=" ml-4" />
          </Link>
          <div className="bg-black h-[1px] w-32 " />
          <img src={library} className="mt-6" />
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
            <h1 className="font-bold text-4xl">Kelola Donasi</h1>
          </div>
        </div>
        <div className="flex mt-7 gap-5">
          <div className="flex flex-col items-center justify-center h-52 w-[50%] bg-gradient-to-b from-[#66FAB3] to-white">
            <img src={diterima} />
            <h1 className="text-3xl font-bold">{countDiterima}</h1>
            <h1 className="font-semibold text-xl">Diterima</h1>
          </div>

          <div className="flex flex-col items-center justify-center h-52 w-[50%] bg-gradient-to-b from-[#FFA48F] to-white">
            <img src={ditolak} />
            <h1 className="text-3xl font-bold">{countDitolak}</h1>
            <h1 className="font-semibold text-xl">Ditolak</h1>
          </div>
        </div>
        <div className="bg-white  mt-10 rounded-lg shadow-lg">
          <table className="table-auto h-full w-[95%] mr-10 m-5 rounded-md  ">
            <thead>
              <tr>
                <th className="bg-white border-b-2 text-left px-8 py-4">
                  Judul
                </th>
                <th className="bg-white border-b-2  text-center px-8 py-4">
                  Format
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
              {paginatedData.map((data, index) => {
                if (index < 10) {
                  return (
                    <tr key={index} className="hover:bg-[#F4F4F4]">
                      <td className=" px-8 py-4    ">
                        <div>{data.title}</div>
                      </td>
                      <td className=" px-8 py-4 flex gap-2 justify-center">
                        <Link
                          to={`/admin/book/${data.uuid}`}
                          className="bg-[#0868F9] rounded-md text-white text-center w-[50%] h-[20%]"
                        >
                          {getFileExtension(data.file_pdf)}
                        </Link>
                        <Link
                          to={`/admin/audio/${data.uuid}`}
                          className="bg-[#8DB9FE] rounded-md text-white text-center  w-[50%] h-[20%]"
                        >
                          {getFileExtension(data.file_mp3)}
                        </Link>
                      </td>
                      <td className=" px-8 py-4  ">
                        <div>{getDate(data.createdAt)}</div>
                      </td>
                      <td className="flex justify-center items-center  px-8 py-4 gap-3  ">
                        <select
                          id="Kategori"
                          placeholder="Kategori"
                          name="classification"
                          value={selectedValue[index]} // Use selectedValue[index] instead of selectedValue
                          onChange={(event) => handleChange(event, index)} // Pass index to handleChange function
                          className={`${getStatusColor(
                            data.status,
                            selectedValue[index]
                          )} flex justify-center items-center  text-center h-[40%] w-[60%] rounded-md 
                            `}
                        >
                          {(() => {
                            if (data.status === "Draft") {
                              return (
                                <>
                                  <option value="Draft">{data.status}</option>
                                  <option value="Diterima">Diterima</option>
                                  <option value="Ditolak">Ditolak</option>
                                </>
                              );
                            } else if (data.status === "Diterima") {
                              return (
                                <>
                                  <option value="Diterima">
                                    {data.status}
                                  </option>
                                  <option value="Draft">Draft</option>
                                  <option value="Ditolak">Ditolak</option>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <option value="Ditolak">{data.status}</option>
                                  <option value="Draft">Draft</option>
                                  <option value="Diterima">Diterima</option>
                                </>
                              );
                            }
                          })()}
                        </select>
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              data.uuid,
                              data.classification,
                              selectedValue[index]
                            )
                          }
                        >
                          <img src={paper} />
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-end my-4 mx-10">
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
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
