// import { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';

// function useGet() {
//   const dispatch = useDispatch();
//   const apikey= import.meta.env.VITE_GEOAPIKEY
//  useEffect(()=>{
// navigator.geolocation.getCurrentPosition(async(position)=>{
//   console.log(position);
//   const latitude=position.coords.latitude;
//   const longitude= position.coords.longitude;
//   const result=  await axios.get(`https://api.geoapify.com/v1/geocode/reverse?
//     lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
//     console.log(result)
// })
//  },[])
// }

// export default useGet;

import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice.js';

function useGet() {
  const dispatch = useDispatch();
  //  const {UserData}=useSelector(state=>state.UserData);
  const apikey = import.meta.env.VITE_GEOAPIKEY;
 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      console.log("API Key:", apikey);

      // try {
        const result = await axios.get(
          "https://api.geoapify.com/v1/geocode/reverse",
          {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
              apiKey: apikey,
            },
          }
        );

        console.log("API result:", result.data.results[0].city);
        console.log(result)
        // dispatch(setCurrentName(result?.data?.results[0].name))
        dispatch(setCurrentCity(result?.data?.results[0].city))
         dispatch(setCurrentState(result?.data?.results[0].state))
           
          dispatch(setCurrentAddress(result?.data?.results[0].address_line2 ||result?.data?.results[0].address_line1))
         console.log(result.data)
      // } catch (error) {
      //   console.error("FULL ERROR:", error);
      //   console.log(result)
      //   if (error.response) {
      //     console.error("STATUS:", error.response.status);
      //     console.error("DATA:", error.response.data);
      //   }
      // }
    });
  }, []);
}

export default useGet;
