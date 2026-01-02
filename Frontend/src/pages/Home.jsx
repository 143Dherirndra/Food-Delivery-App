

import { useSelector } from "react-redux";
import Deliveryboy from "../component/Deliveryboy";
import OwerDashboard from "../component/OwerDashboard";
import UserDashboard from "../component/UserDashboard";
import { useEffect } from "react";

function Home() {
  // yahan pura slice se userData lo
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    console.log(userData)
  })
  console.log("redux userData ==>", userData);

  // agar userData hi nahi mila (login nahi hai, ya load nahi hua)
  if (!userData) {
    return (
      <div className="bg-[#fff9f6]">
        {/* yahan tum loader / login page / kuch bhi dikha sakte ho */}
        <p>Kripya login kijiye ya data load hone ka wait kijiye...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fff9f6]">
      {userData?.role === "user" && <UserDashboard />}
      {userData?.role === "owner" && <OwerDashboard />}
      {userData?.role === "deliveryboy" && <Deliveryboy />}
    </div>
  );
}

export default Home;
