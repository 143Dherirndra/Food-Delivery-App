import React from "react";
import { IoLeaf } from "react-icons/io5";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const FoodCard = ({ data }) => {
  const renderStar = (rating = 0) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <FaStar key={i} className="text-yellow-400 text-lg" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-lg" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col duration-300">
      <div className="w-full h-[170px] flex justify-center relative items-center bg-white">
        <div className="top-3 right-3 absolute rounded-full p-1 bg-white shadow">
          {data.foodType === "veg" ? (
            <IoLeaf className="text-green-600 text-4xl" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-3xl" />
          )}
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>

        <div className="flex items-center gap-1">
          {renderStar(0)}
          <span className="text-gray-400 text-xs">(0)</span>
        </div>

        <p className="text-sm font-semibold text-gray-700 mt-1">
          ₹{data.price}
        </p>
      </div>
    </div>
  );
};

export default FoodCard; // ✅ THIS LINE IS MANDATORY
