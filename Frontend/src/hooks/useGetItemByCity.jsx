import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItemInMyCity } from "../redux/userSlice";

const useGetItemByCity = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return;

    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/items/get-by-city/${currentCity}`,
          { withCredentials: true }
        );

        dispatch(setItemInMyCity(res.data));
        console.log("Items in city:", res.data);
      } catch (error) {
        console.error("Failed to fetch items", error);
        dispatch(setItemInMyCity([]));
      }
    };

    fetchItem();
  }, [currentCity, dispatch]);
};

export default useGetItemByCity;
