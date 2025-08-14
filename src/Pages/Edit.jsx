import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { RxUpdate } from "react-icons/rx"; //icon
import { IoIosArrowRoundBack } from "react-icons/io"; //icon
import Title from "../Components/Title.jsx";

const Edit = () => {
  const navigate = useNavigate();
  const { Id } = useParams();

  //token
  const [token, settoken] = useState("");

  useEffect(() => {
    const gettinToken = localStorage.getItem("adminToken");
    settoken(gettinToken);
  }, []);

  const [loader, setloader] = useState(false);
  const [currentData, setcurrentData] = useState("");

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);
  const [image5, setimage5] = useState(false);

  const subCategories = {
    Men: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Jackets",
      "Traditional Wear",
    ],
    Women: ["Tops", "Kurtis", "Sarees", "Dresses", "Jeans", "Abayas", "Hijabs"],
    Kids: ["T-Shirts", "Frocks", "Shorts", "Ethnic Wear", "Jackets"],
    Accessories: ["Caps", "Belts", "Scarves", "Bags", "Socks"],
  };

  const Sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const [name, setname] = useState(""); //name
  const [description, setdescription] = useState(""); //description
  const [price, setprice] = useState(""); //price
  const [category, setCategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [selectedSizes, setselectedSizes] = useState([]);

  const [bestseller, setbestseller] = useState(false);

  //auto get data from backend using params id.
  const getDataFromBackend = async (Id) => {
    setloader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/product/single`,
        { Id }, // request body
        {
          headers: { token },
        }
      );
      if (response.data.success) {

        setcurrentData(response.data.SingleProduct);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloader(false);
    }
  };

 
  useEffect(() => {
    getDataFromBackend(Id);
  }, [Id, token]);

  useEffect(() => {
    if (currentData) {
      setimage1(currentData.image?.[0] || "");
      setimage2(currentData.image?.[1] || "");
      setimage3(currentData.image?.[2] || "");
      setimage4(currentData.image?.[3] || "");
      setimage5(currentData.image?.[4] || "");

      setname(currentData.name || "");
      setdescription(currentData.description || "");
      setprice(currentData.price || "");
      setCategory(currentData.category || "");
      setsubcategory(currentData.subcategory || "");
      setselectedSizes(currentData.selectedSizes || []);
      setbestseller(currentData.bestseller || false);
      setselectedSizes(currentData.sizes || []);
      // similarly for images if needed
    }
  }, [currentData]);

 

  const submittionHandler = async (e) => {
    setloader(true);
    e.preventDefault();

    if (selectedSizes.length === 0) {
      return toast.error("select Sizes, Please.");
    }

    try {
      const formData = new FormData();
      formData.append("Id", Id); // include Id here
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("sizes", JSON.stringify(selectedSizes)); //we cant sent array in formData
      formData.append("bestseller", bestseller);

      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("image5", image5);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/product/edit`,
        formData ,
        { headers: { token } }
      );
      if (response.data.success) {
        console.log(response.data.updatedProduct);

        toast.success("Successfull updated");

        // clear the form
        const resetForm = () => {
          setname("");
          setdescription("");
          setprice("");
          setCategory("");
          setsubcategory("");
          setselectedSizes([]);
          setbestseller(false);
          setimage1(false);
          setimage2(false);
          setimage3(false);
          setimage4(false);
          setimage5(false);
        };
        resetForm();

        setTimeout(() => {
          navigate("/List"); // reDirect to List page
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);

    } finally {
      setloader(false);
    }
  };

  if (loader) {
    return <Loader />;
  } else
    return (
      <>
        <div className="w-full h-full text-balance p-2 md:px-15 lg:px-20 overflow-hidden ">
          <div className="flex justify-start items-center gap-2" onClick={()=>navigate('/List')}>
          <IoIosArrowRoundBack />
           <span className=" font-semibold text-gray-400 cursor-pointer hover:text-black">Back</span>
          </div>
          

          <form
            onSubmit={(e) => submittionHandler(e)}
            encType="multipart/form-data"
          >
            {/* Upload Images */}
            <div className="imagesDIV ">
              <Title text1={"EDIT"} text2={"\xa0\xa0Product"} />

              <h2 className="font-semibold text-xl">Upload New Images</h2>

              {/* Main Images */}
              <label htmlFor="image1">
                <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                  Old Image 1
                </h5>
                <img
                  className={`${
                    image1
                      ? "h-15 sm:h-30  sm:w-25"
                      : " h-14 sm:h-24 opacity-50"
                  } w-14 sm:w-24 border-1 cursor-pointer  rounded-sm hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                  src={
                    !image1
                      ? "/images/upload-icon-30.png"
                      : typeof image1 === "string"
                      ? image1
                      : URL.createObjectURL(image1)
                  }
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => {
                    setimage1(e.target.files[0]);
                  }}
                />
              </label>

              {/* 4 small images */}
              <div className="flex gap-3   mt-3">
                <label htmlFor="image2">
                  <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                    Old Image 2
                  </h5>
                  <img
                    className={`${
                      image2
                        ? "h-15 sm:h-30  sm:w-25"
                        : " h-10 sm:h-20 opacity-50"
                    } w-10 sm:w-20 border-1 cursor-pointer  rounded-sm hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    src={
                      !image2
                        ? "/images/upload-icon-30.png"
                        : typeof image2 === "string"
                        ? image2
                        : URL.createObjectURL(image2)
                    }
                  />
                  <input
                    type="file"
                    id="image2"
                    hidden
                    onChange={(e) => setimage2(e.target.files[0])}
                  />
                </label>

                <label htmlFor="image3">
                  <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                    Old Image 3
                  </h5>
                  <img
                    className={`${
                      image3
                        ? "h-15 sm:h-30  sm:w-25"
                        : " h-10 sm:h-20 opacity-50"
                    } w-10 sm:w-20 border-1 cursor-pointer  rounded-sm hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    src={
                      !image3
                        ? "/images/upload-icon-30.png"
                        : typeof image3 === "string"
                        ? image3
                        : URL.createObjectURL(image3)
                    }
                  />
                  <input
                    type="file"
                    id="image3"
                    hidden
                    onChange={(e) => {
                      setimage3(e.target.files[0]);
                    }}
                  />
                </label>

                <label htmlFor="image4">
                  <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                    Old Image 4
                  </h5>
                  <img
                    className={`${
                      image4
                        ? "h-15 sm:h-30  sm:w-25"
                        : " h-10 sm:h-20 opacity-50"
                    } w-10 sm:w-20 border-1 cursor-pointer  rounded-sm hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    src={
                      !image4
                        ? "/images/upload-icon-30.png"
                        : typeof image4 === "string"
                        ? image4
                        : URL.createObjectURL(image1)
                    }
                  />
                  <input
                    type="file"
                    id="image4"
                    hidden
                    onChange={(e) => {
                      setimage4(e.target.files[0]);
                    }}
                  />
                </label>

                <label htmlFor="image5">
                  <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                    Old Image 5
                  </h5>
                  <img
                    className={`${
                      image5
                        ? "h-15 sm:h-30  sm:w-25"
                        : " h-10 sm:h-20 opacity-50"
                    } w-10 sm:w-20 border-1 cursor-pointer  rounded-sm hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    src={
                      !image5
                        ? "/images/upload-icon-30.png"
                        : typeof image5 === "string"
                        ? image5
                        : URL.createObjectURL(image5)
                    }
                  />
                  <input
                    type="file"
                    id="image5"
                    hidden
                    onChange={(e) => {
                      setimage5(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* product Name */}
            <div className="w-full  my-2 md:my-6">
              <h2 className="font-semibold focus:border-pink-600 ext-xl ">Upload New Images</h2>

              <input
                onChange={(e) => setname(e.target.value)}
                type="text"
                value={name}
                required
                className="w-full lg:w-1/2 border-1 focus:border-pink-600 border-gray-400 outline-0 rounded-sm px-4 py-2 placeholder:text-gray-400 placeholder:text-sm text-xl"
                placeholder="Your Product Name"
              />
            </div>

            {/* product description  */}
            <div className="w-full  my-2 md:my-6">
              <h2 className="font-semibold  text-xl ">Edit description </h2>
              <textarea
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                required
                className="w-full focus:border-pink-600 lg:w-1/2 min-h-[60px] max-h-[300px] border-1 border-gray-400 outline-0 rounded-sm px-4 py-4 placeholder:text-gray-400 placeholder:text-sm text-xl"
                placeholder="Product description "
              />
            </div>

            {/* ---------- Category  +   Sub Cat   +    Price ----------  */}
            <div className="glassCategory w-full lg:w-1/2   my-2 md:my-6 flex flex-col lg:flex-row gap-2">
              {/* Category */}
              <div className="w-full lg:w-1/3 ">
                <h2 className="font-semibold  text-xl ">Product Cat</h2>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                  className={
                    "w-full  border-1 focus:border-pink-600  border-gray-400 outline-0 rounded-sm px-4 py-3 cursor-pointer"
                  }
                >
                  <option value="" disabled hidden className="">
                    Select category
                  </option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/*sub Cat */}
              <div className="w-full lg:w-1/3">
                <h2 className="font-semibold  text-xl">Sub Cat</h2>
                <select
                  value={subcategory}
                  onChange={(e) => setsubcategory(e.target.value)}
                  className="w-full  border-1 focus:border-pink-600 border-gray-400 outline-0 rounded-sm px-4 py-3 cursor-pointer"
                  required
                >
                  <option value="" disabled hidden className="">
                    Select SubCategory
                  </option>
                  {subCategories[category || "Men"]?.map((cat) => (
                    <option key={cat} value={`${cat}`}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/*Price */}
              <div className="w-full lg:w-1/3 ">
                <h2 className="font-semibold  text-xl">Product Price</h2>
                <input
                  onChange={(e) => setprice(e.target.value)}
                  value={price}
                  type="number"
                  min={1}
                  required
                  className="w-full focus:border-pink-600  border-1 placeholder:text-gray-400 placeholder:text-sm cursor-pointer border-gray-400 outline-0 rounded-sm px-4 py-2 text-xl"
                  placeholder="Rs."
                ></input>
              </div>
            </div>

            {/* Sizes */}
            <div className="w-full  my-2 md:my-6">
              <h2 className="font-semibold  text-xl">Size</h2>
              <div className="w-full flex gap-2 flex-wrap">
                {Sizes.map((size) => (
                  <span
                    onClick={() =>
                      setselectedSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size]
                      )
                    }
                    key={size}
                    className={`${
                      selectedSizes.includes(size)
                        ? "bg-[var(--main-color)] text-white"
                        : "hover:text-black"
                    } w-[40px]  h-[40px] text-center font-semibold p-2 rounded-sm text-gray-500 cursor-pointer border-1 hover:border-2  hover:scale-110 hover:shadow-2xl  border-gray-400 active:scale-90`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Best Seller */}
            <div className="w-full  my-4 md:my-6 flex gap-2 ">
              <input
                onChange={() => setbestseller((prev) => !prev)}
                checked={bestseller}
                type="checkbox"
                id="bestSeller"
                className="w-4 h-4"
              />
              <label
                className="hover:text-gray-700 font-semibold text-gray-400 text-sm cursor-pointer select-none"
                htmlFor="bestSeller"
              >
                Add to Best Seller
              </label>
            </div>

            <button
              type="submit"
              className="px-9 py-3 mt-4 rounded-sm w-full md:w-auto text-2xl bg-gradient-to-bl flex gap-4 justify-center items-center from-green-700 via-green-600 to-green-500 text-white hover:scale-105 active:scale-90 hover:shadow-2xl cursor-pointer"
            >
              <span>UPDATE</span> 
              <RxUpdate />
            </button>
          </form>
        </div>
      </>
    );
};

export default Edit;
