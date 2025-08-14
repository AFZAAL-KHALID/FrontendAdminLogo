import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomToast from "../Components/CostumToast.jsx";
import { toast } from "react-toastify";
import Loader from "../Components/Loader.jsx";
import { MdOutlineFileDownloadDone } from "react-icons/md"; //icon

const AddProduct = () => {
  const navigate = useNavigate();
  const [token, settoken] = useState("");
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

  useEffect(() => {
    const gettinToken = localStorage.getItem("adminToken");
    settoken(gettinToken);
  }, []);

  const Sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const [name, setname] = useState(""); //name
  const [description, setdescription] = useState(""); //description
  const [price, setprice] = useState(""); //price
  const [category, setCategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [selectedSizes, setselectedSizes] = useState([]);

  const [bestseller, setbestseller] = useState(false);
  const [loader, setloader] = useState(false);
  const [success, setsuccess] = useState(false); //to show custome toast

  const submittionHandler = async (e) => {
    setloader(true);
    e.preventDefault();
    if (selectedSizes.length === 0) {
      return toast.error("select Sizes, Please.");
    }

    try {
      const formData = new FormData();

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
        `${import.meta.env.VITE_BACKEND_API}/api/product/add`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.product);

        setsuccess(true); //toast custom
        setTimeout(() => {
          setsuccess(false);
          navigate("/List");
        }, 4500);

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
        <div className="w-full h-full p-2 md:px-15 lg:px-20 overflow-hidden">
          {success ? <CustomToast /> : ""}

          <form
            onSubmit={(e) => submittionHandler(e)}
            encType="multipart/form-data"
          >
            {/* Upload Images */}
            <div className="imagesDIV ">
              <h2 className="font-semibold text-xl">Upload Images</h2>

              {/* Main Images */}
              <label htmlFor="image1">
                <h5 className="text-gray-300 text-xs md:text-sm font-semibold mb-1">
                  Image 1
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
                    Image 2
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
                    Image 3
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
                    Image 4
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
                        : URL.createObjectURL(image4)
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
                    Image 5
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
              <h2 className="font-semibold  text-xl">Product Name</h2>
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
              <h2 className="font-semibold  text-xl">description </h2>
              <textarea
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                required
                className="w-full lg:w-1/2 min-h-[60px] focus:border-pink-600 max-h-[300px] border-1 border-gray-400 outline-0 rounded-sm px-4 py-4 placeholder:text-gray-400 placeholder:text-sm text-xl"
                placeholder="Product description "
              />
            </div>

            {/* ---------- Category  +   Sub Cat   +    Price ----------  */}
            <div className="glassCategory w-full lg:w-1/2   my-2 md:my-6 flex flex-col lg:flex-row gap-2">
              {/* Category */}
              <div className="w-full lg:w-1/3 ">
                <h2 className="font-semibold  text-xl">Product Category</h2>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                  className={
                    "w-full  border-1 focus:border-pink-600 border-gray-400 outline-0 rounded-sm px-4 py-3 cursor-pointer"
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
                <h2 className="font-semibold  text-xl">Sub Category</h2>
                <select
                  value={subcategory}
                  onChange={(e) => setsubcategory(e.target.value)}
                  className="w-full  border-1 focus:border-pink-600 border-gray-400 outline-0 rounded-sm px-4 py-3 cursor-pointer"
                  required
                >
                  <option value="" disabled hidden className="">
                    Select category
                  </option>
                  {subCategories[category || "Men"]?.map((cat) => (
                    <option value={`${cat}`}>{cat}</option>
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
                    } w-[40px] h-[40px] text-center font-semibold p-2 rounded-sm text-gray-500 cursor-pointer border-1 hover:border-2  hover:scale-110 hover:shadow-2xl  border-gray-400 active:scale-90`}
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
              className="px-9 py-3 mt-4 rounded-sm flex justify-center items-center gap-3 text-2xl bg-[var(--main-color)] text-white hover:scale-105 active:scale-90 hover:shadow-2xl cursor-pointer"
            >
              <span>ADD</span>
              <MdOutlineFileDownloadDone />
            </button>
          </form>
        </div>
      </>
    );
};

export default AddProduct;
