import React, { useRef, useState, useEffect } from "react";
import Nav from "./Nav";
import { categories } from "../category";
import Category from "./Category";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useSelector } from "react-redux";
import useGetShopByCity from "../hooks/useGetShopByCity";
import FoodCard from "./foodCard";
import useGetItemByCity from "../hooks/useGetItemByCity";

const UserDashboard = () => {
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  useGetShopByCity();
  useGetItemByCity();
  
  // ✅ Redux state (ARRAY)
  const { shopsInMyCity,ItemInMyCity } = useSelector((state) => state.user);

  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(true);

  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(true);

  // 🔹 reusable button updater
  const updateButton = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;

    setLeft(el.scrollLeft > 0);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  // 🔹 scroll handlers
  const scrollCate = (direction) => {
    cateScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const scrollShop = (direction) => {
    shopScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!cateScrollRef.current || !shopScrollRef.current) return;

    const handleCateScroll = () => {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
    };

    const handleShopScroll = () => {
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
    };

    // initial check
    handleCateScroll();
    handleShopScroll();

    cateScrollRef.current.addEventListener("scroll", handleCateScroll);
    shopScrollRef.current.addEventListener("scroll", handleShopScroll);

    return () => {
      cateScrollRef.current?.removeEventListener("scroll", handleCateScroll);
      shopScrollRef.current?.removeEventListener("scroll", handleShopScroll);
    };
  }, [shopsInMyCity]);

  return (
    <div className="flex items-center flex-col">
      <Nav />

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-700 text-2xl sm:text-3xl mt-10">
          Inspiration for your first order
        </h1>

        {/* ================= CATEGORY SCROLL ================= */}
        <div className="w-full relative">
          {showCateLeftButton && (
            <button
              onClick={() => scrollCate("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2
              text-white bg-[#ff4d2d] p-2 rounded-full shadow-lg z-10"
            >
              <CiCircleChevLeft size={24} />
            </button>
          )}

          <div
            ref={cateScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-2 scroll-smooth"
          >
            {categories.map((cate, index) => (
              <Category
                key={index}
                name={cate.category}
                image={cate.image}
              />
            ))}
          </div>

          {showCateRightButton && (
            <button
              onClick={() => scrollCate("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2
              text-white bg-[#ff4d2d] p-2 rounded-full shadow-lg z-10"
            >
              <CiCircleChevRight size={24} />
            </button>
          )}
        </div>

        {/* ================= SHOP SCROLL ================= */}
        <div className="w-full relative">
          {showShopLeftButton && (
            <button
              onClick={() => scrollShop("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2
              text-white bg-[#ff4d2d] p-2 rounded-full shadow-lg z-10"
            >
              <CiCircleChevLeft size={24} />
            </button>
          )}

          <div
            ref={shopScrollRef}
            className="w-full flex overflow-x-auto gap-4 pb-2 scroll-smooth"
          >
            {shopsInMyCity?.length > 0 ? (
              shopsInMyCity.map((shop, index) => (
                <Category
                  key={index}
                  name={shop.name}
                  image={shop.image}
                />
              ))
            ) : (
              <p className="text-gray-400 px-2">No shops found</p>
            )}
          </div>

          {showShopRightButton && (
            <button
              onClick={() => scrollShop("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2
              text-white bg-[#ff4d2d] p-2 rounded-full shadow-lg z-10"
            >
              <CiCircleChevRight size={24} />
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-700 text-2xl sm:text-3xl mt-10">Sugested food items</h1>
        <div className="w-full h-auto flex  justify-center gap-[20px]">
        {ItemInMyCity?.map((item, index) => (
  <FoodCard key={item._id || index} data={item} />
))}

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
