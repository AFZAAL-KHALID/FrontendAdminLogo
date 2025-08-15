import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6"; //close eye
import { IoEyeOutline } from "react-icons/io5"; //open eye
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordVisible, setpasswordVisible] = useState(false);

  const submitionHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/user/admin`,
        { email, password }
      );

      if (response.data.success) {
        console.log(response.data.token); //delete

        localStorage.setItem("adminToken", response.data.token);
        navigate('/');
        window.location.reload();

      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");

    }
  };


   
  
  return (
    <>
      <div className="h-[80vh] w-full p-4  flex flex-col justify-center items-center ">
    <div className="LOGO w-full text-start font-[logoFont] m-3 text-2xl ">Logo.</div>

        <h1 className="font-[LoginFont]  m-12 sm:m-9 text-4xl md:text-6xl ">
          Admin LogIn <br />
          
          {/* will delte late following 2 lines */}
         <h5 className="text-sm">noshad@gmail.com </h5> 
          <h5 className="text-sm">noshad12345678 </h5>
        </h1>

        <form
          noValidate
          onSubmit={(e) => submitionHandler(e)}
          className="loginDIV  w-full sm:w-3/4 md:w-2/4 h-full  sm:h-1/2 text-xl   flex justify-start items-center flex-col gap-4 "
        >
          {/* ---------Email */}
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Email"
            className={` w-full px-4 py-2 outline-0 rounded-xl`}
            style={{
              background: "#EDF2F4",
              boxShadow: "11px 11px 28px #c9cecf, -11px -11px 28px #ffffff",
            }}
          />

          {/* ---------Password + (eye icon) */}
          <div
            className="flex justify-between px-4 py-2 items-center gap-2 rounded-xl w-full "
            style={{
              background: "#EDF2F4",
              boxShadow: "11px 11px 28px #c9cecf, -11px -11px 28px #ffffff",
            }}
          >
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Password"
              className="  flex-3  outline-0 "
            />

            <span
              className="cursor-pointer text-gray-500"
              onClick={() => setpasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <FaRegEyeSlash /> : <IoEyeOutline />}
            </span>
          </div>

          {/* Submit BTN--------------- */}
          <button
            type="submit"
            className="w-full text-center px-4 py-2 select-none bg-[var(--main-color)] text-white rounded-xl mt-4 cursor-pointer 
             hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
