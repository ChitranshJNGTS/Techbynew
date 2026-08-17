// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaGoogle,
//   FaFacebook,
//   FaLinkedin,
//   FaUser,
//   FaPhoneAlt,
//   FaBriefcase,
// } from "react-icons/fa";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
// const [loading, setLoading] = useState(false);
// const API = "http://localhost:5050/api/users";

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     role: "candidate",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     setLoading(true);

//     if (isLogin) {
//       const res = await axios.post(`${API}/login`, {
//         email: form.email,
//         password: form.password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert("Login Successful");

//       navigate("/");
//     } else {
//       const res = await axios.post(`${API}/register`, {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         password: form.password,
//         confirmPassword: form.confirmPassword,
//         role: form.role,
//       });

//       alert(res.data.message);

//       setIsLogin(true);

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         role: "candidate",
//       });
//     }
//   } catch (err) {
//     alert(err.response?.data?.message || "Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <section className="min-h-screen bg-slate-950 flex items-center justify-center py-16 px-4">

//       <div className="max-w-6xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

//         {/* Left Side */}

//         <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-500 to-green-700 p-14 text-white">

//           <h1 className="text-5xl font-bold leading-tight">
//             Welcome to
//             <br />
//             Job Portal
//           </h1>

//           <p className="mt-8 text-lg leading-8 text-green-100">
//             Find your dream job, connect with top companies,
//             schedule mock interviews, build your career,
//             and get hired faster.
//           </p>

//           <div className="space-y-6 mt-12">

//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                 <FaBriefcase />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-xl">
//                   10,000+ Jobs
//                 </h3>

//                 <p className="text-green-100">
//                   Updated daily
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                 <FaUser />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-xl">
//                   5,000+ Companies
//                 </h3>

//                 <p className="text-green-100">
//                   Trusted employers
//                 </p>
//               </div>
//             </div>

//           </div>

//         </div>

//         {/* Right Side */}

//         <div className="p-10 lg:p-14">

//           <div className="text-center">

//             <h2 className="text-4xl font-bold text-white">

//               {isLogin ? "Welcome Back" : "Create Account"}

//             </h2>

//             <p className="text-slate-400 mt-3">

//               {isLogin
//                 ? "Login to continue"
//                 : "Register and start your career"}

//             </p>

//           </div>

//           {/* Toggle */}

//           <div className="bg-slate-800 rounded-full flex p-1 mt-10">

//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-3 rounded-full transition ${
//                 isLogin
//                   ? "bg-emerald-500 text-white"
//                   : "text-slate-300"
//               }`}
//             >
//               Login
//             </button>

//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-3 rounded-full transition ${
//                 !isLogin
//                   ? "bg-emerald-500 text-white"
//                   : "text-slate-300"
//               }`}
//             >
//               Register
//             </button>

//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5 mt-10"
//           >            {!isLogin && (
//               <>
//                 {/* Full Name */}

//                 <div className="relative">
//                   <FaUser className="absolute left-4 top-5 text-slate-400" />

//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
//                   />
//                 </div>

//                 {/* Phone */}

//                 <div className="relative">
//                   <FaPhoneAlt className="absolute left-4 top-5 text-slate-400" />

//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Mobile Number"
//                     value={form.phone}
//                     onChange={handleChange}
//                     className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Email */}

//             <div className="relative">
//               <FaEnvelope className="absolute left-4 top-5 text-slate-400" />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
//               />
//             </div>

//             {/* Password */}

//             <div className="relative">
//               <FaLock className="absolute left-4 top-5 text-slate-400" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-5 text-slate-400 hover:text-white"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Confirm Password */}

//             {!isLogin && (
//               <div className="relative">
//                 <FaLock className="absolute left-4 top-5 text-slate-400" />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
//                 />
//               </div>
//             )}

//             {/* Role */}

//             {!isLogin && (
//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-4 text-white outline-none"
//               >
//                 <option value="candidate">Candidate</option>
//                 <option value="employer">Employer</option>
//               </select>
//             )}

//             {/* Remember */}

//             {isLogin && (
//               <div className="flex justify-between items-center">

//                 <label className="flex items-center gap-2 text-slate-300">
//                   <input type="checkbox" />
//                   Remember Me
//                 </label>

//                 <button
//                   type="button"
//                   className="text-emerald-400 hover:underline"
//                 >
//                   Forgot Password?
//                 </button>

//               </div>
//             )}

//             {/* Terms */}

//             {!isLogin && (
//               <label className="flex items-start gap-3 text-slate-300 text-sm">
//                 <input type="checkbox" required className="mt-1" />
//                 I agree to the Terms & Conditions and Privacy Policy.
//               </label>
//             )}

//             {/* Submit */}

//             <button
//   type="submit"
//   disabled={loading}
//   className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold transition disabled:opacity-50"
// >
//   {loading
//     ? "Please Wait..."
//     : isLogin
//     ? "Login"
//     : "Create Account"}
// </button>

//             <div className="flex items-center gap-3">

//               <div className="flex-1 h-px bg-slate-700"></div>

//               <span className="text-slate-400 text-sm">
//                 OR
//               </span>

//               <div className="flex-1 h-px bg-slate-700"></div>

//             </div>

//             {/* Social Login */}

//             <div className="grid grid-cols-3 gap-4">

//               <button
//                 type="button"
//                 className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
//               >
//                 <FaGoogle />
//               </button>

//               <button
//                 type="button"
//                 className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
//               >
//                 <FaFacebook />
//               </button>

//               <button
//                 type="button"
//                 className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
//               >
//                 <FaLinkedin />
//               </button>

//             </div>

//           </form>

//           <p className="text-center text-slate-400 mt-8">

//             {isLogin
//               ? "Don't have an account?"
//               : "Already have an account?"}

//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-emerald-400 ml-2 hover:underline font-semibold"
//             >
//               {isLogin ? "Register" : "Login"}
//             </button>

//           </p>

//         </div>

//       </div>

//     </section>
//   );
// } 










































import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaUser,
  FaPhoneAlt,
  FaBriefcase,
} from "react-icons/fa";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { auth } from "../../../firebase";

import toast from "react-hot-toast";

import API from "../../Api/JobApi";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const [rememberMe, setRememberMe] = useState(true);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // GET FIREBASE TOKEN
  // =========================

  const getFirebaseToken = async (user) => {
    if (!user) {
      throw new Error("Firebase user not found.");
    }

    const token = await user.getIdToken(true);

    return token;
  };

  // =========================
  // CREATE MONGODB PROFILE
  // =========================

  const createMongoProfile = async (user, extraData = {}) => {
    try {
      const token = await getFirebaseToken(user);

      const response = await API.post(
        "/users/profile",
        {
          name:
            extraData.name ||
            user.displayName ||
            "",

          phone:
            extraData.phone ||
            "",

          role:
            extraData.role ||
            "candidate",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.user;
    } catch (error) {
      console.error(
        "MongoDB Profile Error:",
        error
      );

      throw error;
    }
  };

  // =========================
  // GET MONGODB PROFILE
  // =========================

  const getMongoProfile = async (user) => {
    try {
      const token = await getFirebaseToken(user);

      const response = await API.get(
        "/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.user;
    } catch (error) {
      console.error(
        "Get MongoDB Profile Error:",
        error
      );

      throw error;
    }
  };

  // =========================
  // SAVE USER TO LOCAL STORAGE
  // =========================

  const saveUserToLocalStorage = (user, userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email || "",
        name:
          userData?.name ||
          user.displayName ||
          "",
        phone:
          userData?.phone ||
          "",
        role:
          userData?.role ||
          "candidate",
        photoURL:
          userData?.photoURL ||
          user.photoURL ||
          "",
      })
    );
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error(
        "Please enter email and password."
      );
      return;
    }

    try {
      setLoading(true);

      // Firebase persistence
      await setPersistence(
        auth,
        rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      // Firebase Login
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      const user = userCredential.user;

      // Get MongoDB profile
      const userData =
        await getMongoProfile(user);

      // Save user locally
      saveUserToLocalStorage(
        user,
        userData
      );

      toast.success(
        "Login successful!"
      );

      navigate("/");
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      let message =
        "Login failed.";

      // Firebase errors
      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        message =
          "Invalid email or password.";
      }

      if (
        error.code ===
        "auth/user-not-found"
      ) {
        message =
          "No account found with this email.";
      }

      if (
        error.code ===
        "auth/wrong-password"
      ) {
        message =
          "Incorrect password.";
      }

      if (
        error.code ===
        "auth/invalid-email"
      ) {
        message =
          "Please enter a valid email.";
      }

      if (
        error.code ===
        "auth/too-many-requests"
      ) {
        message =
          "Too many attempts. Please try again later.";
      }

      // Backend profile not found
      if (
        error.response?.status === 404
      ) {
        message =
          "Your account exists, but your profile was not found.";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================

const handleRegister = async (e) => {
  e.preventDefault();

  // ==========================================
  // VALIDATION
  // ==========================================

  if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  if (form.password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  // ==========================================
  // NORMALIZE EMAIL
  // ==========================================

  const email = form.email.trim().toLowerCase();

  try {
    setLoading(true);

    // ==========================================
    // CREATE FIREBASE ACCOUNT
    // ==========================================

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      form.password
    );

    const user = userCredential.user;

    console.log("Firebase user created:", {
      uid: user.uid,
      email: user.email,
    });

    // ==========================================
    // SET FIREBASE DISPLAY NAME
    // ==========================================

    await updateProfile(user, {
      displayName: form.name.trim(),
    });

    // ==========================================
    // CREATE MONGODB PROFILE
    // ==========================================

    const userData = await createMongoProfile(user, {
      name: form.name.trim(),
      email: email,
      phone: form.phone.trim(),
      role: form.role || "candidate",
    });

    // ==========================================
    // SAVE LOCAL USER
    // ==========================================

    saveUserToLocalStorage(user, userData);

    // ==========================================
    // SUCCESS
    // ==========================================

    toast.success("Account created successfully!");

    // ==========================================
    // RESET FORM
    // ==========================================

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "candidate",
    });

    // ==========================================
    // REDIRECT
    // ==========================================

    navigate("/");
  } catch (error) {
    console.error("Registration Error:", error);

    let message = "Registration failed.";

    // ==========================================
    // FIREBASE ERRORS
    // ==========================================

    switch (error.code) {
      case "auth/email-already-in-use":
        message =
          "An account already exists with this email.";
        break;

      case "auth/invalid-email":
        message =
          "Please enter a valid email address.";
        break;

      case "auth/weak-password":
        message =
          "Password should be at least 6 characters.";
        break;

      case "auth/network-request-failed":
        message =
          "Network error. Please check your internet connection.";
        break;

      case "auth/operation-not-allowed":
        message =
          "Email/password registration is not enabled.";
        break;

      default:
        break;
    }

    // ==========================================
    // BACKEND ERROR
    // ==========================================

    if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  // =========================
  // FORGOT PASSWORD
  // =========================

  const handleForgotPassword = async () => {
  const email = form.email?.trim();

  if (!email) {
    toast.error("Please enter your email first.");
    return;
  }

  try {
    setLoading(true);

    console.log("Sending password reset to:", email);

    await sendPasswordResetEmail(auth, email);

    console.log("Password reset request accepted by Firebase");

    toast.success(
      "Password reset email sent. Please check your inbox and spam folder."
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    console.error("Firebase error code:", error.code);
    console.error("Firebase error message:", error.message);

    let message = "Unable to send reset email.";

    if (error.code === "auth/user-not-found") {
      message = "No account found with this email.";
    } else if (error.code === "auth/invalid-email") {
      message = "Please enter a valid email.";
    } else if (error.code === "auth/too-many-requests") {
      message = "Too many requests. Please try again later.";
    }

    toast.error(message);
  } finally {
    setLoading(false);
  }
};
  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin =
    async () => {
      try {
        setLoading(true);

        const provider =
          new GoogleAuthProvider();

        // Persistence
        await setPersistence(
          auth,
          rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence
        );

        // Firebase Google Login
        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user = result.user;

        let userData;

        // =========================
        // CHECK MONGODB PROFILE
        // =========================

        try {
          userData =
            await getMongoProfile(
              user
            );
        } catch (error) {
          // If profile doesn't exist,
          // create it.

          if (
            error.response?.status ===
            404
          ) {
            userData =
              await createMongoProfile(
                user,
                {
                  name:
                    user.displayName ||
                    "",
                  phone: "",
                  role: "candidate",
                }
              );
          } else {
            throw error;
          }
        }

        // =========================
        // SAVE USER LOCALLY
        // =========================

        saveUserToLocalStorage(
          user,
          userData
        );

        toast.success(
          "Google login successful!"
        );

        navigate("/");
      } catch (error) {
        console.error(
          "Google Login Error:",
          error
        );

        if (
          error.code !==
          "auth/popup-closed-by-user"
        ) {
          let message =
            "Google login failed.";

          if (
            error.response?.data?.message
          ) {
            message =
              error.response.data.message;
          }

          toast.error(message);
        }
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center lg:py-16 lg:px-4">

      <div className="max-w-6xl w-full bg-slate-900 lg:rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-500 to-green-700 p-14 text-white">

          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <br />
            Job Portal
          </h1>

          <p className="mt-8 text-lg leading-8 text-green-100">
            Find your dream job, connect
            with top companies, schedule
            mock interviews, build your
            career, and get hired faster.
          </p>

          <div className="space-y-6 mt-12">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FaBriefcase />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  10,000+ Jobs
                </h3>

                <p className="text-green-100">
                  Updated daily
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FaUser />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  5,000+ Companies
                </h3>

                <p className="text-green-100">
                  Trusted employers
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="p-6 sm:p-10 lg:p-14">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-white">
              {isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h2>

            <p className="text-slate-400 mt-3">
              {isLogin
                ? "Login to continue"
                : "Register and start your career"}
            </p>

          </div>

          {/* ================= TOGGLE ================= */}

          <div className="bg-slate-800 rounded-full flex p-1 mt-10">

            <button
              type="button"
              onClick={() =>
                setIsLogin(true)
              }
              className={`flex-1 py-3 rounded-full transition ${
                isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() =>
                setIsLogin(false)
              }
              className={`flex-1 py-3 rounded-full transition ${
                !isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Register
            </button>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-10"
          >

            {/* NAME */}

            {!isLogin && (
              <div className="relative">

                <FaUser className="absolute left-4 top-5 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>
            )}

            {/* PHONE */}

            {!isLogin && (
              <div className="relative">

                <FaPhoneAlt className="absolute left-4 top-5 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>
            )}

            {/* EMAIL */}

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-5 text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
              />

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <FaLock className="absolute left-4 top-5 text-slate-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-5 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}

            {!isLogin && (
              <div className="relative">

                <FaLock className="absolute left-4 top-5 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={
                    form.confirmPassword
                  }
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>
            )}

            {/* ROLE */}

            {!isLogin && (
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-4 text-white outline-none focus:border-emerald-500"
              >
                <option value="candidate">
                  Candidate
                </option>

                <option value="employer">
                  Employer
                </option>
              </select>
            )}

            {/* REMEMBER + FORGOT */}

            {isLogin && (
              <div className="flex justify-between items-center gap-3">

                <label className="flex items-center gap-2 text-slate-300">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  Remember Me

                </label>

                <button
                  type="button"
                  onClick={
                    handleForgotPassword
                  }
                  disabled={loading}
                  className="text-emerald-400 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* TERMS */}

            {!isLogin && (
              <label className="flex items-start gap-3 text-slate-300 text-sm">

                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />

                <span>
                  I agree to the Terms &
                  Conditions and Privacy
                  Policy.
                </span>

              </label>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please Wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>

            {/* OR */}

            <div className="flex items-center gap-3">

              <div className="flex-1 h-px bg-slate-700"></div>

              <span className="text-slate-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-700"></div>

            </div>

            {/* SOCIAL LOGIN */}

            <div className="grid grid-cols-3 gap-4">

              {/* GOOGLE */}

              <button
                type="button"
                onClick={
                  handleGoogleLogin
                }
                disabled={loading}
                className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center items-center transition disabled:opacity-50"
              >
                <FaGoogle />
              </button>

              {/* FACEBOOK */}

              <button
                type="button"
                disabled
                title="Facebook login coming soon"
                className="py-3 rounded-xl border border-slate-700 text-slate-500 flex justify-center items-center cursor-not-allowed"
              >
                <FaFacebook />
              </button>

              {/* LINKEDIN */}

              <button
                type="button"
                disabled
                title="LinkedIn login coming soon"
                className="py-3 rounded-xl border border-slate-700 text-slate-500 flex justify-center items-center cursor-not-allowed"
              >
                <FaLinkedin />
              </button>

            </div>

          </form>

          {/* SWITCH */}

          <p className="text-center text-slate-400 mt-8">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setIsLogin(!isLogin)
              }
              className="text-emerald-400 ml-2 hover:underline font-semibold"
            >
              {isLogin
                ? "Register"
                : "Login"}
            </button>

          </p>

        </div>

      </div>

    </section>
  );
}