import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SigIn.jsx";
import SignUp from "./pages/signup.jsx";

import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import ForgatePassword from "./pages/forgatePassword.jsx";
import useGet from "./hooks/useGet.jsx";
import useGetmyShop from "./hooks/useGetmyShop.jsx";
import CreateEditshop from "./pages/createEditshop.jsx";
import AddItems from "./pages/AddItems.jsx";
import EditItems from "./pages/EditItems.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemByCity from "./hooks/useGetItemByCity.jsx";
// import Home from './pages/Home.jsx';

function App() {
  useGetCurrentUser();
  useGetmyShop();
  useGetShopByCity()
  useGetItemByCity()
  const userData = useSelector((state) => state.user?.userData);

  useGet();

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/signin"} />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgatePassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/home"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditshop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/Add-items"
        element={userData ? <AddItems /> : <Navigate to={"/signin"} />}
      />
     <Route
  path="/edit-items/:itemId"
  element={userData ? <EditItems /> : <Navigate to="/signin" />}
/>

    </Routes>
  );
}

export default App;
