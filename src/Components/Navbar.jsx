import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

   const [dark, setDark] = useState(false);

  const logoutHandler = () => {
    const answer = window.confirm("Do you want to Log out?");
    if (answer) {
      localStorage.removeItem("adminToken");
      navigate("/Login");
      window.location.reload();
    }
  };

   const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <div className="w-full  flex justify-between text-2xl items-center px-4 border-b-[1px] border-gray-300 text-gray-800 ">
      <div className="flex gap-2 justify-center items-center" >
        <h2 className="div1 font-[logoFont]  m-3 text-[var(--heading-color)]">Logo.</h2>

            <div
              onClick={() => toggleDark()}
              title="Theme"
              className="relative w-6 md:w-9 h-3 md:h-5 bg-[var(--main-color)] rounded-2xl cursor-pointer hover:shadow-xl"
            >
              <span
                className={`absolute w-2 md:w-3 h-2 md:h-3 top-0.5 md:top-1 left-1 rounded-full transition-all duration-500 bg-[var(--bg-color)] ${
                  dark ? "left-3.5 md:left-5" : ""
                }`}
              ></span>
            </div>
      </div>

   

      <div
        onClick={() => logoutHandler()}
        className="group  relative m-4 cursor-pointer font-semibold flex items-center space-x-2"
      >
        <FaPowerOff className="hover:text-[var(--main-color)] text-[var(--heading-color)] active:scale-90" />
        <span
          className="logoutTitle hidden md:inline-block absolute right-[120%] top-0 whitespace-nowrap 
      overflow-hidden px-0 w-0 border-0
      group-hover:px-3 group-hover:py-1 group-hover:w-[90px] group-hover:border-white
      group-hover:border-2 border-transparent 
      rounded-md text-base 
      transition-[width, padding, border] duration-300 ease-in-out text-[var(--heading-color)]"
        >
          LOG OUT
        </span>
      </div>
    </div>
  );
};

export default Navbar;
