import React, { useEffect, useRef } from "react";
import { CiEdit } from "react-icons/ci"; //icon
import { MdDelete } from "react-icons/md"; //icon bin
import { gsap } from "gsap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ product }) => {
  const [token, settoken] = useState(""); //token

  const navigate = useNavigate();

  useEffect(() => {
    const gettinToken = localStorage.getItem("adminToken");
    settoken(gettinToken);
  }, []);

  const detailRef = useRef(null);
  const [detailsToggle, setdetailsToggle] = useState(false);

  //   gsap animation
  useEffect(() => {
    if (detailsToggle) {
      gsap.fromTo(
        detailRef.current,
        { height: 0, opacity: 0, padding: 0, display: "block", border: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          padding: 6,
          ease: "power2.out",
          border: 1,
        }
      );
    } else {
      gsap.to(detailRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (detailRef.current) {
            detailRef.current.style.display = "none";
          }
        },
      });
    }
  }, [detailsToggle]);

  const deleteHandler = async (ProductId) => {
    const confirmed = window.confirm('Are you sure to delete it ?')
if (confirmed) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/product/remove`,
        { ProductId },
        { headers: { token } }
      );
      if (response.data.success) {
        console.log("deleteItem:", response.data.removedProduct);

        toast.success("Successfull deleted");
        setTimeout(() => {
          navigate(0);
        }, 800);
      }
    } catch (error) {
      console.log(error);
    }
}else{
  null
}
   
  };

  return (
    <div className={`relative w-40 h-50 border-[1px] rounded-sm`}>

      {/* edit icon */}
      <span
        className="bg-[#ffffff99] rounded-md p-2 group absolute top-2 right-2  cursor-pointer text-balance opacity-50 hover:opacity-100"
        onClick={() => navigate(`/Edit/${product._id}`)}
      >
        <h5 className="opacity-0 group-hover:opacity-100 text-[var(--main-color)]  hidden md:inline-block  absolute right-[-100%] top-[0%]  w-0  group-hover:w-[20px] font-semibold   text-sm  transition-[width] duration-300 ease-in-out ">
          Edit
        </h5>
        <CiEdit className="group-hover:scale-120" />
      </span>

      <img
        src={product.image?.[0]}
        alt=""
        className=" rounded-md w-full h-full object-cover"
      />

      <span
        className="absolute bottom-0 select-none right-0 rounded-tl-lg bg-[#ffffffa8] w-[60%] text-center hover:text-black text-gray-500 cursor-pointer"
        style={{ borderRadius: "100% 0% 0% 100% / 100% 0% 100% 0%" }}
        onClick={() => setdetailsToggle((prev) => !prev)}
      >
        Info
      </span>

      <span
        className=" bg-[#ffffff99] rounded-md p-2 group absolute bottom-2 left-2  cursor-pointer text-balance opacity-50 hover:opacity-100"
        onClick={() => deleteHandler(product._id)}
      >
        <MdDelete className="hover:scale-120" />
      </span>

      {/* Details div */}
      <div
        ref={detailRef}
        className="w-full absolute z-50 top-[102%]  h-0 border-t-0 p-0 text-gray-500 font-semibold bg-white rounded-b-sm  overflow-hidden"
      >
        <h4 className="flex gap-2 font-semibold">
          Name:
          <span className="text-gray-900 text-balance">{product.name}</span>
        </h4>

        <h4 className="flex gap-2 font-semibold">
          Desc:
          <span className="text-gray-900 text-balance">
            {product.description}
          </span>
        </h4>

        <h4 className="flex gap-2 font-semibold">
          Price:
          <span className="text-gray-900 text-balance">{product.price}</span>
        </h4>

        <h4 className="flex gap-2 font-semibold">
          Cat:
          <span className="text-gray-900 text-balance">{product.category}</span>
        </h4>

        <h4 className="flex gap-2 font-semibold">
          Sub Cat:
          <span className="text-gray-900 text-balance">
            {product.subcategory}
          </span>
        </h4>

        <h4 className="flex gap-2 font-semibold">
          Best Seller:
          <span className="text-gray-900 text-balance">
            {product.bestseller}
          </span>
        </h4>

        <h4 className="flex flex-col mt-2 text-sm font-semibold whitespace-nowrap">
          Upload on:
          <span className="text-gray-900 text-balance ">
            {new Date(product.date).toLocaleString()}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Card;
