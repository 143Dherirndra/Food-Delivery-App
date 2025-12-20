// import React, { useState } from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { BsSearch } from "react-icons/bs";
// import { IoCartOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { RxCross1 } from "react-icons/rx";
// import { setMyShopData } from "../redux/ownerSlice";
// function Nav() {
//   const userData = useSelector((state) => state.user.userData);
//   const firstLetter = (
//     userData?.fullName ||
//     userData?.fullname ||
//     userData?.name ||
//     ""
//   ).slice(0, 1);
//   const [showInfo, setshowInfo] = useState(false);
//   const [shoSearch, setshoSearch] = useState(false);
//   return (
//     <div
//       className=" w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] 
//   px-[20x] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible"
//     >
//       {shoSearch && userData.role == "user" && (
//         <div
//           className="w-[90%] h-[70px] bg-white shadow-xl items-center
//       rounded-lg gap-[20px] flex fixed top-[80px] left-[-5%]"
//         >
//           <div className=" flex items-center  overflow-hidden w-[30%] gap-[20px] px-[10px] border-r-2 border-gray-400">
//             <CiLocationOn size={20} className="text-[#ff4d2d]" />
//             <div className="truncate w-[80px] text-gray-500">Faizabaad</div>
//           </div>
//           <div className="w-[80%] flex items-center gap-[10px]">
//             <BsSearch size={20} className=" text-[#ff4d2d] " />
//             <input
//               type="text"
//               placeholder="Search deliciuos food.."
//               className="w-full px-[10px]
//  text-gray-700 outline-0"
//             />
//           </div>
//         </div>
//       )}
//       <h1 className="text-3xl text-[#ff4d2d] font-bold">Vingo</h1>
//       {userData.role=='user' &&    <div
//         className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl items-center
//       rounded-lg gap-[20px] hidden md:flex"
//       >
//         <div className=" flex items-center  overflow-hidden w-[30%] gap-[20px] px-[10px] border-r-2 border-gray-400">
//           <CiLocationOn size={20} className="text-[#ff4d2d]" />
//           <div className="truncate w-[80px] text-gray-500">Faizabaad</div>
//         </div>
//         <div className="w-[80%] flex items-center gap-[10px]">
//           <BsSearch size={20} className=" text-[#ff4d2d] " />
//           <input
//             type="text"
//             placeholder="Search deliciuos food.."
//             className="w-full px-[10px]
//  text-gray-700 outline-0"
//           />
//         </div>
//       </div> }
//     {
//       console.log(userData.role)
//     }
   
//       <div className="flex items-center gap-2.5">
//         {shoSearch ? (
//           <RxCross1 onClick={() => setshoSearch(false)} />
//         ) : (
//           <BsSearch
//             size={20}
//             className=" text-[#ff4d2d] md:hidden "
//             onClick={() => setshoSearch(true)}
//           />
//         )}
  
//         <div className="relative cursor-pointer">
//           <IoCartOutline size={30} className="text-[#ff4d2d]" />
//           <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
//             0
//           </span>
//         </div>
//         <button
//           className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10
//      text-[#ff4d2d] etxt-sm font-medium"
//         >
//           My order
//         </button>

//         <div
//           className="w-8 h-8 rounded-full bg-[#ff4d2d]/10 flex items-center justify-center"
//           onClick={() => setshowInfo((prev) => !prev)}
//         >
//           {firstLetter || "U"}
//         </div>
//         {showInfo && (
//           <div
//             className="fixed top-[80px] right-[10px] md:right-[10%] lg-right-[25%] w-[120px]
//        rounded-xl p-[20px] bg-white shadow-2xl flex flex-col gap-[10px] z-[9999]"
//           >
//             <div className="text-[17px] font-semibold">{userData.fullname}</div>
//             <div className="md:hidden font-semibold cursor-pointer text-[#ff4d2d]">
//               {" "}
//               order
//             </div>
//             <div className="font-semibold cursor-pointer text-[#ff4d2d]">
//               LogOut
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Nav;

// // import React from 'react';
// // import { CiLocationOn } from "react-icons/ci";
// // import { BsSearch } from "react-icons/bs";
// // import { IoCartOutline } from "react-icons/io5";
// // import { useSelector } from 'react-redux';

// // function Nav() {
// //   const userData = useSelector((state) => state.user.userData);

// //   const firstLetter = (userData?.fullName || userData?.fullname || userData?.name || "").slice(0, 1);

// //   return (
// //     <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px]
// //       px-[20x] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>
// //       <h1 className='text-3xl text-[#ff4d2d] font-bold'>Vingo</h1>

// //       <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl items-center rounded-lg gap-[20px] flex'>
// //         <div className='flex items-center overflow-hidden w-[30%] gap-[20px] px-[10px] border-r-2 border-gray-400'>
// //           <CiLocationOn size={20} className='text-[#ff4d2d]' />
// //           <div className='truncate w-[80px] text-gray-500'>Faizabaad</div>
// //         </div>
// //         <div className='w-[80%] flex items-center gap-[10px]'>
// //           <BsSearch size={20} className='text-[#ff4d2d]' />
// //           <input
// //             type="text"
// //             placeholder='Search deliciuos food..'
// //             className='w-full px-[10px] text-gray-700 outline-0'
// //           />
// //         </div>
// //       </div>

// //       <div className='relative cursor-pointer'>
// //         <IoCartOutline size={30} className='text-[#ff4d2d]' />
// //         <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span>
// //       </div>

// //       <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>
// //         My order
// //       </button>

// //       <div className='w-8 h-8 rounded-full bg-[#ff4d2d]/10 flex items-center justify-center'>
// //         {firstLetter || "U"}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Nav;


import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const firstLetter = (
    userData?.fullName ||
    userData?.fullname ||
    userData?.name ||
    "U"
  ).slice(0, 1);

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div
      className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px]
      px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]"
    >
      {/* 🔍 Mobile Search Bar */}
      {showSearch && userData?.role === "user" && (
        <div
          className="w-[90%] h-[70px] bg-white shadow-xl items-center
          rounded-lg gap-[20px] flex fixed top-[80px] left-[5%]"
        >
          <div className="flex items-center w-[30%] gap-[10px] px-[10px] border-r-2 border-gray-300">
            <CiLocationOn size={20} className="text-[#ff4d2d]" />
            <div className="truncate text-gray-500">Faizabad</div>
          </div>
          <div className="w-[70%] flex items-center gap-[10px]">
            <BsSearch size={18} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full outline-0 text-gray-700"
            />
          </div>
        </div>
      )}

      {/* LOGO */}
      <h1
        className="text-3xl text-[#ff4d2d] font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Vingo
      </h1>

      {/* 🔍 Desktop Search (User Only) */}
      {userData?.role === "user" && (
        <div
          className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl items-center
          rounded-lg gap-[20px] hidden md:flex"
        >
          <div className="flex items-center w-[30%] gap-[10px] px-[10px] border-r-2 border-gray-300">
            <CiLocationOn size={20} className="text-[#ff4d2d]" />
            <div className="truncate text-gray-500">Faizabad</div>
          </div>
          <div className="w-[70%] flex items-center gap-[10px]">
            <BsSearch size={18} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full outline-0 text-gray-700"
            />
          </div>
        </div>
      )}

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center gap-3">
        {/* 🔍 Mobile Search Toggle */}
        {userData?.role === "user" && (
          showSearch ? (
            <RxCross1
              className="text-[#ff4d2d] cursor-pointer md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <BsSearch
              size={20}
              className="text-[#ff4d2d] cursor-pointer md:hidden"
              onClick={() => setShowSearch(true)}
            />
          )
        )}

        {/* ➕ PLUS ICON (Owner Only) */}
        {userData?.role === "owner" && (
          <div
            onClick={() => navigate("/Add-items")}
            title="Add Food Item"
            className="w-9 h-9 rounded-full bg-[#ff4d2d]
            flex items-center justify-center cursor-pointer
            hover:bg-[#e64323] transition"
          >
            <FaPlus className="text-white" />
          </div>
        )}

        {/* USER AVATAR */}
        <div
          className="w-8 h-8 rounded-full bg-[#ff4d2d]/10
          flex items-center justify-center cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {firstLetter}
        </div>

        {/* PROFILE DROPDOWN */}
        {showInfo && (
          <div
            className="fixed top-[80px] right-[10px] md:right-[10%]
            w-[140px] rounded-xl p-4 bg-white shadow-2xl
            flex flex-col gap-2 z-[9999]"
          >
            <div className="font-semibold text-gray-700">
              {userData?.fullname || "User"}
            </div>

            {userData?.role === "user" && (
              <div
                className="cursor-pointer text-[#ff4d2d] font-medium"
                onClick={() => navigate("/orders")}
              >
                My Orders
              </div>
            )}

            <div className="cursor-pointer text-red-500 font-medium">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
