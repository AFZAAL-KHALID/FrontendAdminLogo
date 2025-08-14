import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const answer = window.confirm("Do you want to Log out?");
    if (answer) {
      localStorage.removeItem("adminToken");
      navigate("/Login");
      window.location.reload();
    }
  };

  return (
    <div className="w-full  flex justify-between text-2xl items-center px-4 border-b-[1px] border-gray-300 text-gray-800 ">
      <div className="div1 font-[logoFont]  m-3 ">Logo.</div>

      <div
        onClick={() => logoutHandler()}
        className="group  relative m-4 cursor-pointer font-semibold flex items-center space-x-2"
      >
        <FaPowerOff className="hover:text-[var(--main-color)] active:scale-90" />
        <span
          className="logoutTitle hidden md:inline-block absolute right-[120%] top-0 whitespace-nowrap 
      overflow-hidden px-0 w-0 border-0
      group-hover:px-3 group-hover:py-1 group-hover:w-[90px] group-hover:border-white
      group-hover:border-2 border-transparent 
      rounded-md text-base 
      transition-[width, padding, border] duration-300 ease-in-out"
        >
          LOG OUT
        </span>
      </div>
    </div>
  );
};

export default Navbar;
