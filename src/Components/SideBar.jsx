import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io"; //icon
import { CiBoxList } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showHide, setshowHide] = useState(false);

  return (
    <div className="my-2 md:min-h-[90vh] transition-all duration-150 ease-in-out w-full md:w-auto md:min-w-[90px] flex flex-row md:flex-col gap-2 border-r-2  border-gray-300">
     
      <div
        className={` hidden w-full md:flex flex-col md:flex-row md:whitespace-nowrap justify-center  items-center md:gap-3 cursor-pointer text-center p-2 md:p-5 font-bold border-b-2  text-base  md:text-xl whitespace-nowrap`}
      >
        <h1
          className={`${
            showHide ? "" : "hidden"
          } transition-all duration-200 text-wrap ease-in-out`}
        >
          Admin Controlls
        </h1>
        <span>
          <FaChevronRight
            className={`${
              showHide ? "rotate-180" : "rotate-0"
            } transition-all duration-200 hidden md:inline-block ease-in-out `}
            onClick={() => {
              setshowHide((prev) => !prev);
            }}
          />
        </span>
      </div>

      <div className="w-full flex  justify-center items-center gap-2 md:flex-col md:gap-0">
        <div
          className={`group flex flex-col w-full justify-center md:flex-row gap-2 px-[1px] md:px-2 cursor-pointer md:justify-start items-center  border-b-2 border-gray-300 py-4  text-base md:text-xl hover:text-white hover:bg-[var(--main-color)]`}
          onClick={() => navigate("/AddProduct")}
        >
          <IoIosAddCircleOutline className="text-3xl md:2xl" />

          <h2
            className={`group-hover:text-white ${showHide ? "" : "hidden"} ${
              location.pathname === "/AddProduct"
                ? "text-[var(--main-color)] "
                : "" } text-wrap md:whitespace-nowrap`}
          >
            Add Product
          </h2>
        </div>

        <div
         className={`group flex flex-col md:flex-row w-full gap-2 px-2 cursor-pointer justify-start items-center  border-b-2 border-gray-300 py-4 text-wrap text-base md:text-xl hover:text-white hover:bg-[var(--main-color)]`}
          onClick={() => navigate("/List")}
        >
          <CiBoxList className="text-3xl md:2xl " />
          <h2
            className={`group-hover:text-white ${showHide ? "" : "hidden"} ${
              location.pathname === "/List"
                ? "text-[var(--main-color)] "
                : ""
            } whitespace-nowrap"`}
          >
            Product List
          </h2>
        </div>

        <div
          className={`group flex flex-col md:flex-row w-full gap-2 px-2 cursor-pointer justify-start hover:text-white items-center  border-b-2 border-gray-300 py-4 text-wrap text-base md:text-xl  hover:bg-[var(--main-color)]`}
          onClick={() => navigate("/Orders")}
        >
          <FaBox className="text-3xl md:2xl  " />
          <h2
            className={`group-hover:text-white ${showHide ? "" : "hidden"} ${
              location.pathname === "/Orders"
                ? "text-[var(--main-color)]"
                : ""
            } whitespace-nowrap"`}
          >
            Orders
          </h2>
        </div>

      </div>

    </div>
  );
};

export default SideBar;
