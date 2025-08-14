import React, { useState } from "react";
import Loader from "../Components/Loader.jsx";
import Title from "../Components/Title.jsx";
import axios from "axios";
import { useEffect } from "react";
import { RxUpdate } from "react-icons/rx"; //icon

import Card from "../Components/Card.jsx";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const [loader, setloader] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) return;

      setloader(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/product/list`,
          { headers: { token: token } }
        );
        if (res.data.success) setproducts(res.data.allProducts);
      } catch (err) {
        console.log(err.message);
      } finally {
        setloader(false);
      }
    };

    fetchProducts();
  }, []);

  if (loader) {
    return <Loader />;
  } else
    return (
      <>
        {products.length === 0 ? (
          <div 
            onClick={()=> navigate(0)}
          className="w-full h-[80vh]  md:text-2xl flex justify-center cursor-pointer flex-col items-center text-xl text-gray-400">
            <span>Nothing to show.</span>
            <span className="flex justify-start items-center gap-3 ">
              <span className="font-semibold text-gray-600">Refresh the page!</span>
               <RxUpdate />
            </span>
          </div>
        ) : (
          <div className="w-full min-h-screen  p-2 md:p-7 lg:p-9 flex-col">
            <div className="w-1/2 flex justify-start items-center gap-2 md:gap-6">
              <Title text1={"All"} text2={"Products"} />
              <span className="text-balance md:text-xl text-gray-400 font-[MuckleyBold]">
                Total Products:{" "}
                <span className="text-[var(--main-color)]">
                  {products ? products.length : ""}
                </span>
              </span>
            </div>

            <div className=" w-full py-2 grid grid-cols-2 :grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {products?.map((product, index) => {
                return (
                  <div key={product._id}>
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
};

export default List;
