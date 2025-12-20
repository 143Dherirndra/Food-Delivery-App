import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";

const CreateEditshop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState(myShopData?.name || "");
  const [city, setCity] = useState(myShopData?.city || currentCity || "");
  const [stateName, setStateName] = useState(
    myShopData?.state || currentState || ""
  );
  const [address, setAddress] = useState(
    myShopData?.address || currentAddress || ""
  );

  const [frontendImage, setFrontendImage] = useState(
    myShopData?.image || null
  );
  const [backendImage, setBackendImage] = useState(null);

  // handle image select
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", stateName);
      formData.append("address", address);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.post(
        "http://localhost:4000/api/shop/create-edit",
        formData,
        { withCredentials: true }
      );

      dispatch(setMyShopData(res.data));
      console.log(res)
       console.log("ho gaya")
      navigate("/home");
     
    } catch (error) {
      console.error("Create/Edit shop failed:", error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative">
      {/* Back button */}
      <div
        className="absolute top-[20px] left-[20px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoMdArrowRoundBack size={26} className="text-[#ff4d2d]" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-6 rounded-full mb-2">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Shop Name</span>
            <input
              type="text"
              placeholder="Enter shop name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          {/* Image */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Shop Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </label>

          {frontendImage && (
            <img
              src={frontendImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          )}

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">City</span>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">State</span>
              <input
                type="text"
                placeholder="Enter state"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
              />
            </label>
          </div>

          {/* Address */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Address</span>
            <input
              type="text"
              placeholder="Enter shop address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] text-white rounded-lg px-5 py-2 font-semibold shadow-md hover:bg-orange-600 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditshop;
