import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaUtensils, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerItemcard from "./OwnerItemcard";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const { myShopData } = useSelector((state) => state.owner || {});

  console.log("myShopData ->", myShopData);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />

      {/* NO SHOP */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 mt-16">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] h-16 w-16 mb-4" />
              <h1 className="text-2xl font-bold text-gray-500 mb-3">
                Add your restaurant
              </h1>
              <p className="text-gray-400">
                Join our food delivery platform and reach thousands of hungry
                people.
              </p>
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="bg-[#ff4d2d] text-white px-6 py-2 rounded-full mt-3"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP EXISTS */}
      {myShopData && (
        <div className="w-full max-w-3xl mt-6 px-4">
          <h1 className="text-3xl text-gray-500 text-center mb-4">
            Welcome to {myShopData.name}
          </h1>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
            <button
              onClick={() => navigate("/create-edit-shop")}
              className="absolute top-4 right-4 bg-[#ff4d2d] p-2 rounded-full text-white"
            >
              <FaPen />
            </button>

            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="h-60 w-full bg-cover "
            />

            <div className="p-6">
              <p className="text-gray-500">
                {myShopData.city}, {myShopData.state}
              </p>
              <p>{myShopData.address}</p>
            </div>
          </div>

          {/* NO ITEMS */}
          {myShopData?.items?.length === 0 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => navigate("/Add-items")}
                className="bg-[#ff4d2d] text-white px-6 py-2 rounded-full"
              >
                Add Food Items
              </button>
            </div>
          )}
          {myShopData?.items?.length > 0 && (
            <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
              {myShopData.items.map((item, index) => (
                <OwnerItemcard data={item} key={item._id || index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
