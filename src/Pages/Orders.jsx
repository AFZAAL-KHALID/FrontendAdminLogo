import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader.jsx";
import Title from "../Components/Title.jsx";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa"; //icon
import { IoIosArrowRoundBack } from "react-icons/io"; //icon
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()
  const [OrderStatus, setOrderStatus] = useState("");
  const [loader, setloader] = useState(false);
  const [token, settoken] = useState("");
  const [ORDERS, setORDERS] = useState([]);

  const fetchingDataHandler = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    settoken(token);

    setloader(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/Orders/allOrders`,
        { headers: { token: token } }
      );
      if (response.data.success) {
        setORDERS(response.data.allOrders);
      }
    } catch (error) {
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchingDataHandler();
  }, [token]);

  // -------------------------UPDATE ORDER STATUS----------------------------------------------
  const updateOrderHandler = async ({ e, ProductId }) => {
    console.log(e); //delete

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/Orders/updateStatus`,
        { ProductId, Status: e },
        { headers: { token: token } }
      );

      if (response.data.success) {
        fetchingDataHandler();
        console.log("success");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        onClick={() => navigate("/")}
        className="flex justify-center items-center mx-3 my-2 gap-2 hover:font-semibold cursor-pointer"
      >
        <IoIosArrowRoundBack className="text-gray-400" />
        <h2 className="text-gray-400">Home</h2>
      </div>

      <div className="w-full min-h-screen  p-2 md:p-7 lg:p-9 flex-col gap-3 ">
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:justify-start lg:items-center gap-2 md:gap-6">
          <Title text1={"All"} text2={"Orders"} />

          <span className="text-balance flex justify-center items-center whitespace-nowrap md:text-xl text-gray-400 font-[MuckleyBold]">
            Total Orders:{" "}
            <span className="text-[var(--main-color)]">{ORDERS.length}</span>
          </span>
        </div>

        {[...ORDERS]?.reverse().map((order, index) => (
          <div
            key={order._id}
            className=" w-full border-b-2 border-[var(--heading-color)] md:my-4 lg:my-6 px-4 py-2 rounded-sm shadow-md  flex flex-col lg:flex-row justify-between items-center gap-1"
          >
            <span className=" text-xs md:text-sm  left-2 top-[-10%] flex flex-col text-gray-400 font-semibold">
              <span className="text-gray-300">Order No:</span>
              {order.nanoId}
              <div className="w-5 h-5 md:w-20 md:h-20 text-black">
                <FaBoxOpen className="w-full h-full text-[var(--heading-color)]" />
              </div>
            </span>

            {/* details and address */}

            <div className="w-full lg:w-[80%]  md:border-[1px] md:border-gray-300 rounded-sm flex flex-col justify-start items-start gap-4 lg:flex-row lg:justify-around lg:items-center">
              
              {/* Products details  */}
              <div>
                <h2 className="font-bold text-[var(--main-color)]">
                  Order Details:
                </h2>
                {order?.Cart?.flat().map((product, index) => (
                  // image
                  <div className="flex justify-start mb-3  items-start flex-col lg:flex-row gap-2">
                    <img
                      src={`${product.image[0]}`}
                      alt="Payment Logo"
                      className="w-10   lg:w-22 object-cover rounded-md shadow-md"
                    />

                    <div>
                      {/* name */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm md:text-base  text-gray-500 font-semibold flex wrap-break-word">
                          Name:
                        </h3>
                        <h2 className="text-base md:text-base text-[var(--heading-color)]  font-semibold break-words">
                          {product.name}
                        </h2>
                      </div>

                      {/* size */}
                      <div className="text-sm md:text-base text-gray-500 font-semibold flex gap-1">
                        Size:
                        <h2 className=" text-base md:text-base text-[var(--heading-color)] font-semibold break-words">
                          {product.Sizes}
                        </h2>
                      </div>

                      {/* Date */}
                      <div className="text-sm text-gray-400 font-semibold flex gap-2">
                        Order Placed on:
                        <h2 className="font-semibold text-[var(--heading-color)] ">
                          {new Date(order.date).toLocaleString("en-US", {
                            weekday: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // or false for 24-hour format
                          })}
                        </h2>
                      </div>

                      {/* price , quantity and total */}
                      <div className="flex gap-3 flex-wrap justify-start items-center">
                        <p className="text-sm text-gray-400  font-semibold flex gap-2">
                          Price:
                          <h2 className="font-semibold text-[var(--heading-color)] ">
                            {product.price}
                          </h2>
                        </p>
                        <h4 className="text-sm">x</h4>

                        <p className="text-sm text-gray-400 font-semibold flex gap-2">
                          Quantity:
                          <h2 className="font-semibold text-[var(--heading-color)] ">
                            {product.quantity}
                          </h2>
                        </p>

                        <h4 className="text-sm">=</h4>

                        <h2 className="font-semibold text-sm flex justify-center items-center gap-2 text-[var(--main-color)] ">
                          <h3 className="text-sm text-gray-400">Total:</h3>{" "}
                          {product.quantity * product.price}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <span className="hidden lg:inline-block h-[3rem] w-[2px] bg-gray-300"></span>

              {/* ------------------Address--------- */}
              <div>
                <h2 className="font-bold text-[var(--main-color)]">Address:</h2>
                {Object.entries(order.Address).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <h3 className="text-sm md:text-base text-gray-500 font-semibold">
                      {key}:
                    </h3>
                    <h2 className="text-base md:text-base text-[var(--heading-color)]  font-semibold break-words">
                      {value}
                    </h2>
                  </div>
                ))}
              </div>

            </div>
            {/* Price & Track Button */}
            <div className="rounded-sm h-auto bg-gray-300/20 w-auto flex flex-col p-1  md:p-4  gap-4">
              <div>
                <p className="text-sm text-gray-400 font-semibold flex gap-2">
                  Payment Mehtod:
                  <h2 className="font-semibold text-[var(--heading-color)] ">
                    {order.paymentMethod}
                  </h2>
                </p>

                <p className="text-sm text-gray-400 font-semibold flex gap-2">
                  Delivery Fee:
                  <h2 className="font-semibold text-[var(--heading-color)] ">120</h2>
                </p>

                <div className="flex justify-start items-center gap-1 md:gap-3 ">
                  <h2 className="font-bold text-[var(--heading-color)]">Total Price:</h2>
                  <p className=" text-base  md:text-xl text-[var(--main-color)] font-bold">
                    {/* {order.GrandTotal} */}
                    Rs.{order.amount}/-
                  </p>
                </div>

                {/* ------------------ Select Button-------- */}
              </div>
              <select
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  updateOrderHandler({
                    e: e.target.value,
                    ProductId: order._id,
                  });
                }}
                defaultValue={order.Status}
                className={`${
                  order.Status === "Order Placed" &&
                  " bg-[var(--main-color)] text-white"
                }
     ${order.Status === "Out for Delivery" && "bg-[#a2d2ff] "}
     ${order.Status === "Delivered" && " bg-green-600 text-white"}     
      rounded-sm border-2 selection:scale-95 px-2 py-2 cursor-pointer font-semibold text-base md:text-lg`}
              >
                <option
                  className="bg-white font-semibold text-gray-800"
                  value="Order Placed"
                >
                  Order Placed
                </option>
                <option
                  className="bg-white font-semibold text-gray-800"
                  value="Out for Delivery"
                >
                  Out for Delivery
                </option>
                <option
                  className="bg-white font-semibold text-gray-800"
                  value="Delivered"
                >
                  Delivered
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
