import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/api/auth/current',
          { withCredentials: true }
        );

        dispatch(setUserData(res.data));
        console.log('Current User:', res.data);
      } catch (error) {
        console.log('User not logged in');
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;

