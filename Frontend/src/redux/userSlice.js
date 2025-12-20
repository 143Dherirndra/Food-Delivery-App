import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
initialState: {
  userData: null,
  currentCity: null,
  currentState: null,
  currentAddress: null,
  shopsInMyCity: [] ,
 ItemInMyCity: [] // ✅ correct
 // ✅ MUST be array
},

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // setCurrentName:()=>{
    //   state.currentName=action.payload;
    // },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
   setCurrentAddress: (state, action) => {
  state.currentAddress = action.payload;
},

    
    setShopsInMyCity:(state,action)=>{
      state.shopsInMyCity= action.payload
    },
    setItemInMyCity:(state,action)=>{
      state.ItemInMyCity= action.payload
    }
  },
});

export const {
  setUserData,
  
  
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemInMyCity
} = userSlice.actions;

// ✅ THIS IS THE MOST IMPORTANT LINE
export default userSlice.reducer;






