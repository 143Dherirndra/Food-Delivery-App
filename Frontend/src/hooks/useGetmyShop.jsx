import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';


function useGetmyShop() {
  const dispatch = useDispatch();
  const {userDsta}=useSelector(state=>state.user)

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/api/auth/get-my',
          { withCredentials: true }
        );

        dispatch(setMyShopData(res.data));
        console.log('My Shop:', res.data);
      } catch (error) {
        console.log('No shop found or error:', error.response?.data);
      }
    };

    fetchShop();
  }, [dispatch,userDsta]);
}

export default useGetmyShop;

