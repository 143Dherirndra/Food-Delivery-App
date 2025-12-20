import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShopsInMyCity } from "../redux/userSlice";

const useGetShopByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

 

useEffect(() => {
  if (!currentCity) return;

  const fetchShops = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/shop/get-by-city/${currentCity}`,
        { withCredentials: true }
      );

      dispatch(setShopsInMyCity(res.data));
    } catch (error) {
      dispatch(setShopsInMyCity([]));
    }
  };

  fetchShops();
}, [currentCity, dispatch]);

};

export default useGetShopByCity;

