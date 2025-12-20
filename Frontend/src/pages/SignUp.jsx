import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullname || !email || !mobile || !password) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:4000/api/auth/signup",
        { fullname, email, mobile, password, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      console.log("Signup success:", result.data);

      setError("");
      setLoading(false);

      // ✅ Yaha se ab /signin pe jaayega, home pe nahi
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result);

      const { data } = await axios.post(
        "http://localhost:4000/api/auth/googleAuth",
        {
          fullname: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));

      // Google auth ke baad bhi redirect kar sakte ho:
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Google authentication failed");
    }
  };

  return (
    <div
    
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account & order your delicious food
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your full name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your mobile number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="absolute right-3 top-[10px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Role</label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryboy"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${primaryColor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Signup Button */}
        <button
          className="w-full font-semibold rounded-lg transition duration-200 py-2 text-white cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSignup}
          disabled={loading}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = hoverColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = primaryColor)
          }
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {err && <p className="text-red-500 my-2">{err}</p>}

        {/* Google Signup */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        {/* Redirect */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-[#ff4d2d] cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

