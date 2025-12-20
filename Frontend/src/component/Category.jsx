// import React from 'react'

// const Category = ({data}) => {
//   return (
//     <div className=' w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden
//     bg-white shadow-lg shadow-gray-300 hover:shadow-lg transition-shadow'>
//         <img src={data.image} alt=""  className='w-full h-full object-cover tranform hover:scale-110
//         transition-transform  duration-200'/>
//         <div className='absolute bottom-0 w-full left-0 bg-opacity-95 px-3 py-1 rounded-t-2xl text-center shadow text-sm
//         font-medium  bg-gray-600 backdrop-blur:
//         '>
//             {data.category}

//         </div>
//     </div>
//   )
// }

// export default Category

import React from "react";

const Category = ({name, image}) => {
  return (
    <div
      className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px]
      rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden
      bg-white shadow-lg shadow-gray-300 hover:shadow-lg transition-shadow"
    >
      <img
        src={image}
       
        className="w-full h-full object-cover transform hover:scale-110
        transition-transform duration-200"
      />

      <div
        className="absolute bottom-0 left-0 w-full bg-gray-600 bg-opacity-90
        px-3 py-1 text-center text-sm font-medium text-white
        backdrop-blur-md"
      >
        {name}
      </div>
    </div>
  );
};

export default Category;
