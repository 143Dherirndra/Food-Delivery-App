


import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";

const EditItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ SAFE SELECTOR
  const { myShopData } = useSelector((state) => state.owner || {});
const { itemId } = useParams();
console.log("ITEM ID:", itemId);


    const [currentItem, setCurrentitem] = useState(null)

  // ✅ STATES (NO null / undefined)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
 const [foodType, setFoodType] = useState( ""); // ✅
 // veg / non-veg
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState(null);


  // ✅ CATEGORY LIST
  const categories = [
    "Snack",
    "Pizza",
    "Burger",
    "Main Course",
    "North Indian",
    "South Indian",
    "Chinese",
    "Fast Food",
    "Other",
  ];

  // ✅ IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // ✅ SUBMIT
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMIT CLICKED"); // 👈 add this


   if (!myShopData?._id) {
  console.log("myShopData missing", myShopData);
  alert("Please create shop first");
  return;
}


    if (!backendImage) {
      alert("Please upload food image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodType", foodType);
      formData.append("shopId", myShopData._id);

      formData.append("image", backendImage);

   const res = await axios.post(
  `http://localhost:4000/api/items/edit-items/${itemId}`,
  formData,
  { withCredentials: true }
);


      // ✅ UPDATE REDUX
      dispatch(setMyShopData(res.data));
console.log(res.data)
      // navigate("/home");
    } catch (error) {
      console.error(
        "Add item failed:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ LOADING SAFETY
  if (!myShopData) {
    return <p className="text-center mt-10">Loading shop...</p>;
  }
useEffect(() => {
  if (!itemId) return;

  const handleGetItemById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/items/get-by-id/${itemId}`,
        { withCredentials: true }
      );
      setCurrentitem(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  handleGetItemById();
}, [itemId]);

useEffect(()=>{
setName(currentItem?.name ||"")
setPrice(currentItem?.price || 0)
setCategory(currentItem?.category ||"")
setFoodType(currentItem?.foodType ||"")
setFrontendImage(currentItem?.image||"")
},[currentItem])

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen relative">
      {/* Back button */}
      <div
        className="absolute top-[20px] left-[20px] cursor-pointer"
        onClick={() => navigate("/home")}
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
            Add Food Item
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Food Name</span>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          {/* Category */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Select Category
            </span>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </label>

          {/* Price */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Price</span>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={price}onChange={(e) => setPrice(Number(e.target.value))}

              required
            />
          </label>

          {/* Food Type */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Food Type</span>
            <select
  className="w-full px-4 py-2 border rounded-lg"
  value={foodType}
  onChange={(e) => setFoodType(e.target.value)}
>

              <option value="">Select type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </label>

          {/* Image */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Food Image
            </span>
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
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#ff4d2d] text-white rounded-lg px-5 py-2 font-semibold hover:bg-orange-600"
          >
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItems;
