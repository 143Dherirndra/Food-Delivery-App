import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ FORM SUBMIT HANDLER
  const handleSignIn = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:4000/api/auth/signIn',
        { email, password, role },
        { withCredentials: true }
      );

      console.log(res.data)
      const payload = res.data.user ?? res.data;
      dispatch(setUserData(payload));
      setError('');

      // ✅ ROLE BASED REDIRECT
      if (payload.role === 'owner') {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const payload = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photo: result.user.photoURL,
        role,
      };

      await axios.post(
        'http://localhost:4000/api/auth/googleAuth',
        {
          fullname: payload.name,
          email: payload.email,
          role,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(payload));

      if (payload.role === 'owner') {
        navigate('/create-edit-shop');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Google Auth Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#ff4d2d] mb-6">Vingo</h1>

        {/* ✅ FORM START */}
        <form onSubmit={handleSignIn}>
          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Role */}
          <div className="flex gap-2 mb-6">
            {['user', 'owner', 'deliveryboy'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-lg border"
                style={role === r ? { background: '#ff4d2d', color: '#fff' } : {}}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {err && <p className="text-red-500 mt-2">{err}</p>}
        </form>
        {/* ✅ FORM END */}

        {/* Google */}
        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 border rounded-lg py-2 flex items-center justify-center gap-2"
        >
          <FcGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;






// import React, { useState } from 'react';
// import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';
// import axios from 'axios';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';

// function SignIn() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState('user');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [err, setError] = useState('');

//   // 🔐 Normal Sign In
//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         'http://localhost:4000/api/auth/signIn',
//         { email, password, role },
//         { withCredentials: true }
//       );

//       // backend may return { user } or direct object
//       const payload = res.data.user ?? res.data;

//       dispatch(setUserData(payload));
//       setError('');
//       navigate('/home');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//     }
//   };

//   // 🔐 Google Sign In
//   const handleGoogleAuth = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const payload = {
//         uid: result.user.uid,
//         email: result.user.email,
//         name: result.user.displayName,
//         photo: result.user.photoURL,
//         role,
//       };

//       // optional backend sync
//       await axios.post(
//         'http://localhost:4000/api/auth/googleAuth',
//         {
//           fullname: payload.name,
//           email: payload.email,
//           role,
//         },
//         { withCredentials: true }
//       );
//       console.log("ho gaya")
//       dispatch(setUserData(payload));
//       navigate('/home');
//     } catch (error) {
//       console.error('Google Auth Error:', error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center p-4"
//       style={{ backgroundColor: '#fff9f6' }}
//     >
//       <div
//         className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
//         style={{ border: '1px solid #ddd' }}
//       >
//         <h1 className="text-3xl font-bold mb-6 text-[#ff4d2d]">Vingo</h1>

//         {/* ✅ FORM */}
//         <form onSubmit={handleSignIn}>
//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="username"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 className="w-full border rounded-lg px-3 py-2"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-[10px] cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <FaRegEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           {/* Role */}
//           <div className="mb-6 flex gap-2">
//             {['user', 'owner', 'deliveryboy'].map((r) => (
//               <button
//                 key={r}
//                 type="button"
//                 onClick={() => setRole(r)}
//                 className="flex-1 rounded-lg px-3 py-2 border"
//                 style={
//                   role === r
//                     ? { backgroundColor: '#ff4d2d', color: 'white' }
//                     : { borderColor: '#ff4d2d' }
//                 }
//               >
//                 {r}
//               </button>
//             ))}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-2 text-white rounded-lg bg-[#ff4d2d]"
//           >
//             Sign In
//           </button>

//           {err && <p className="text-red-500 mt-2">{err}</p>}
//         </form>

//         {/* Google */}
//         <button
//           className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2"
//           onClick={handleGoogleAuth}
//         >
//           <FcGoogle size={20} />
//           <span>Sign In with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SignIn;
