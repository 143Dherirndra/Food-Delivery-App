// import React from 'react'
// import { FaPencilAlt } from "react-icons/fa";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import items from '../../../Backend/model/item.model';
// const OwnerItemcard = (data) => {
//    const navigate=useNavigate()

//   return (
//     <div className='mt-10 flex justify-between bg-white rounded-lg shadow-md *:overflow-hidden border w-full 
//     max-w-2xl border-[#ff4d2d]'>
//         <div className='flex-shrink-0 bg-gray-50 w-36 h-full '>
//             <img src={data.data.image} alt=""  className=' w-full h-full object-cover'/>
//         </div>
//         <div className='flex justify-between p-3 flex-1 ' >
//             <div>
//                 <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.data.name}</h2>
//                 <p className='text-gray-500 font-md'>category{data.data.category}</p>
//                 <p className='text-gray-500 font-md'>foodType:{data.data.foodType}</p>
//                 <br/>
//                   <div className='flex  items-center justify-between'>
//               <div>Price:{data.data.price}</div>
//           </div>
          
//             </div>
//             <div className='flex justify-center space-x-2'>
//            <FaPencilAlt className='text-[#ff4d2d] cursor-pointer '
//            onClick={()=>navigate(`/edit-items/${item._id}`)} />
//            <FaRegTrashAlt  className='text-[#ff4d2d] cursor-pointer'  />
//           </div>
        
//         </div>
//     </div>
//   )
// }

// export default OwnerItemcard

import React from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyShopData } from "../redux/ownerSlice";
import axios from "axios";

const OwnerItemcard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const handleDelete= async ()=>{
    try {
      const res= await axios.get(`http://localhost:4000/api/items/delete/${data._id}`,{
        withCredentials:true})
    dispatch( setMyShopData(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-10 flex justify-between bg-white rounded-lg shadow-md border w-full max-w-2xl border-[#ff4d2d]">
      <div className="flex-shrink-0 bg-gray-50 w-36 h-full">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold text-[#ff4d2d]">
            {data.name}
          </h2>
          <p className="text-gray-500">Category: {data.category}</p>
          <p className="text-gray-500">Food Type: {data.foodType}</p>
          <p className="mt-2">Price: ₹{data.price}</p>
        </div>

        <div className="flex items-start space-x-3">
          {/* ✅ EDIT */}
          <FaPencilAlt
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(`/edit-items/${data._id}`)}
          />

          {/* 🗑️ DELETE (later) */}
          <FaRegTrashAlt
          onClick={handleDelete}
           className="text-[#ff4d2d] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default OwnerItemcard;
