import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import SideBar from "./Components/SideBar.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import Login from "./Pages/Login.jsx";
import Orders from "./Pages/Orders.jsx";
import List from "./Pages/List.jsx";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Edit from "./Pages/Edit.jsx";

const App = () => {
  const [token, settoken] = useState(localStorage.getItem("adminToken"));

 

  if (token) {
    return (
      <>
        <div className=" w-full min-h-screen bg-[var(--bg-color)] ">
          <ToastContainer />
          <Navbar />
          
          <div className="flex flex-col md:flex-row justify-start items-start w-full min-h-[calc(100vh-4rem)] p-4">
            <SideBar />

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/AddProduct" element={<AddProduct />}></Route>
              <Route path="/Orders" element={<Orders />}></Route>
              <Route path="/List" element={<List />}></Route>
              <Route path="/edit/:Id" element={<Edit/>}></Route>
            </Routes>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ToastContainer />
        <Login />
      </>
    );
  }
};

export default App;
