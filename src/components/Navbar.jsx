
// import { useEffect, useState } from "react";
// import {
//   FaUserCircle,
//   FaLock,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaBriefcase,
//   FaGraduationCap,
//   FaVideo,
// } from "react-icons/fa";
// import API from "../Api/JobApi";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar({ onLoginClick }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   const location = useLocation();

//   useEffect(() => {
//     getProfile();
//   }, []);

//   const getProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setUser(null);
//         return;
//       }

//       const { data } = await API.get("/users/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setUser(data.user);
//       }
//     } catch (err) {
//       console.log(err);
//       setUser(null);
//     }
//   };

//   const isActive = (path) => location.pathname === path;

//   const navLinkClass = (path) =>
//     `flex items-center gap-2 transition px-3 py-2 rounded-lg ${
//       isActive(path)
//         ? "text-emerald-400 bg-emerald-500/10"
//         : "text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
//     }`;

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

//       {/* Main Navbar */}
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="h-20 flex items-center justify-between">

//           {/* Logo */}
//             <Link to={"/"} className="flex items-center gap-3">
//           <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
//             <span className="text-green-500 font-bold text-xl lg:text-2xl">
//               TB
//             </span>
//           </div>

//           <h1 className="text-2xl lg:text-4xl font-semibold text-white">
//             Tech<span className="font-light">By</span>
//           </h1>
//         </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center gap-2">

//             <Link to="/" className={navLinkClass("/")}>
//               <FaHome />
//               Home
//             </Link>

//             <Link to="/all-jobs" className={navLinkClass("/all-jobs")}>
//               <FaBriefcase />
//               Jobs
//             </Link>

//             {/* <Link
//               to="/training"
//               className={navLinkClass("/training")}
//             >
//               <FaGraduationCap />
//               Training
//             </Link> */}

//             <Link
//               to="/mock-interview"
//               className={navLinkClass("/mock-interview")}
//             >
//               <FaVideo />
//               Mock Interview
//             </Link>

//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center gap-4">

//             {user ? (
//               <Link
//                 to="/profile"
//                 className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
//                   isActive("/profile")
//                     ? "bg-emerald-500/10"
//                     : "hover:bg-slate-800"
//                 }`}
//               >
//                 <img
//                   src={
//                     user.profileImage ||
//                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       user.name
//                     )}&background=10b981&color=fff`
//                   }
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />

//                 <div>
//                   <p className="text-white font-semibold">
//                     {user.name}
//                   </p>

//                   <p
//                     className={`text-xs ${
//                       isActive("/profile")
//                         ? "text-emerald-400"
//                         : "text-slate-400"
//                     }`}
//                   >
//                     My Profile
//                   </p>
//                 </div>
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 text-white hover:text-emerald-400 transition"
//                 >
//                   <FaLock />
//                   Log In
//                 </Link>

//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 bg-emerald-500 px-5 py-2 rounded-lg text-white hover:bg-emerald-600 transition"
//                 >
//                   <FaUserCircle />
//                   Register
//                 </Link>
//               </>
//             )}

//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-white text-2xl"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-900/95 backdrop-blur-md ${
//           menuOpen ? "max-h-[700px]" : "max-h-0"
//         }`}
//       >
//         <div className="px-6 py-5">

//           {/* Mobile User Details */}
//           {user ? (
//             <Link
//               to="/profile"
//               onClick={closeMenu}
//               className={`flex items-center gap-4 p-4 rounded-2xl mb-5 border transition ${
//                 isActive("/profile")
//                   ? "bg-emerald-500/10 border-emerald-500/40"
//                   : "bg-slate-800/50 border-slate-700 hover:border-emerald-500/40"
//               }`}
//             >
//               <img
//                 src={
//                   user.profileImage ||
//                   `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                     user.name
//                   )}&background=10b981&color=fff`
//                 }
//                 alt={user.name}
//                 className="w-14 h-14 rounded-full object-cover"
//               />

//               <div>
//                 <h3 className="text-white font-semibold">
//                   {user.name}
//                 </h3>

//                 <p className="text-slate-400 text-sm">
//                   {user.email}
//                 </p>

//                 <p className="text-emerald-400 text-xs mt-1">
//                   View Profile
//                 </p>
//               </div>
//             </Link>
//           ) : (
//             <div className="flex gap-3 mb-5">

//               <Link
//                 to="/login"
//                 onClick={closeMenu}
//                 className="flex-1 flex items-center justify-center gap-2 border border-slate-700 text-white py-3 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition"
//               >
//                 <FaLock />
//                 Log In
//               </Link>

//               <Link
//                 to="/login"
//                 onClick={closeMenu}
//                 className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
//               >
//                 <FaUserCircle />
//                 Register
//               </Link>

//             </div>
//           )}

//           {/* Mobile Navigation */}
//           <div className="flex flex-col gap-2">

//             <Link
//               to="/"
//               onClick={closeMenu}
//               className={navLinkClass("/")}
//             >
//               <FaHome />
//               Home
//             </Link>

//             <Link
//               to="/all-jobs"
//               onClick={closeMenu}
//               className={navLinkClass("/all-jobs")}
//             >
//               <FaBriefcase />
//               Jobs
//             </Link>

//             <Link
//               to="/training"
//               onClick={closeMenu}
//               className={navLinkClass("/training")}
//             >
//               <FaGraduationCap />
//               Training
//             </Link>

//             <Link
//               to="/mock-interview"
//               onClick={closeMenu}
//               className={navLinkClass("/mock-interview")}
//             >
//               <FaVideo />
//               Mock Interview
//             </Link>

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// } 





// import { useEffect, useState } from "react";

// import {
//   FaUserCircle,
//   FaLock,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaBriefcase,
//   FaGraduationCap,
//   FaVideo,
//   FaInfoCircle,
//   FaPhoneAlt,
// } from "react-icons/fa";

// import { Link, useLocation } from "react-router-dom";

// import { onAuthStateChanged } from "firebase/auth";

// import { auth } from "../../firebase";

// import API from "../Api/JobApi";

// export default function Navbar({ onLoginClick }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const location = useLocation();

//   // =====================================================
//   // FIREBASE AUTH + MONGODB PROFILE
//   // =====================================================

//   useEffect(() => {
//     let unsubscribe;

//     const checkUser = async () => {
//       unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//         try {
//           if (!firebaseUser) {
//             setUser(null);
//             setLoading(false);
//             return;
//           }

//           // Firebase user is authenticated
//           const firebaseToken = await firebaseUser.getIdToken();

//           // Get MongoDB profile
//           const response = await API.get("/users/profile", {
//             headers: {
//               Authorization: `Bearer ${firebaseToken}`,
//             },
//           });

//           if (response.data.success) {
//             const mongoUser = response.data.user;

//             setUser({
//               ...mongoUser,

//               // Firebase fallback values
//               uid: firebaseUser.uid,
//               email: firebaseUser.email || mongoUser?.email || "",
//               name:
//                 mongoUser?.name ||
//                 firebaseUser.displayName ||
//                 "User",

//               photoURL:
//                 mongoUser?.photoURL ||
//                 firebaseUser.photoURL ||
//                 "",
//             });

//             // Optional:
//             // Keep user information in localStorage
//             localStorage.setItem(
//               "user",
//               JSON.stringify({
//                 ...mongoUser,
//                 uid: firebaseUser.uid,
//                 email:
//                   firebaseUser.email ||
//                   mongoUser?.email ||
//                   "",
//                 name:
//                   mongoUser?.name ||
//                   firebaseUser.displayName ||
//                   "User",
//                 photoURL:
//                   mongoUser?.photoURL ||
//                   firebaseUser.photoURL ||
//                   "",
//               })
//             );
//           }
//         } catch (error) {
//           console.error("Navbar profile error:", error);

//           // If MongoDB profile doesn't exist yet,
//           // still show Firebase user.
//           setUser({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email || "",
//             name: firebaseUser.displayName || "User",
//             photoURL: firebaseUser.photoURL || "",
//             role: "candidate",
//           });
//         } finally {
//           setLoading(false);
//         }
//       });
//     };

//     checkUser();

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, []);

//   // =====================================================
//   // ACTIVE LINK
//   // =====================================================

//   const isActive = (path) => location.pathname === path;

//   // =====================================================
//   // NAV LINK CLASS
//   // =====================================================

//   const navLinkClass = (path) =>
//     `flex items-center gap-2 transition px-3 py-2 rounded-lg ${
//       isActive(path)
//         ? "text-emerald-400 bg-emerald-500/10"
//         : "text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
//     }`;

//   // =====================================================
//   // CLOSE MOBILE MENU
//   // =====================================================

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // =====================================================
//   // PROFILE IMAGE
//   // =====================================================

//   const getProfileImage = () => {
//     if (user?.photoURL) {
//       return user.photoURL;
//     }

//     const name = user?.name || "User";

//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       name
//     )}&background=10b981&color=fff`;
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="h-20 flex items-center justify-between">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
//                 <span className="text-green-500 font-bold text-xl lg:text-2xl">
//                   TB
//                 </span>
//               </div>

//               <h1 className="text-2xl lg:text-4xl font-semibold text-white">
//                 Tech<span className="font-light">By</span>
//               </h1>
//             </Link>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

//       {/* =====================================================
//           MAIN NAVBAR
//       ===================================================== */}

//       <div className="max-w-7xl mx-auto px-6">
//         <div className="h-20 flex items-center justify-between">

//           {/* =====================================================
//               LOGO
//           ===================================================== */}

//           <Link to="/" className="flex items-center gap-3">
//             <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
//               <span className="text-green-500 font-bold text-xl lg:text-2xl">
//                 TB
//               </span>
//             </div>

//             <h1 className="text-2xl lg:text-4xl font-semibold text-white">
//               Tech<span className="font-light">By</span>
//             </h1>
//           </Link>

//           {/* =====================================================
//               DESKTOP MENU
//           ===================================================== */}

//           <div className="hidden lg:flex items-center gap-2">

//             <Link
//               to="/"
//               className={navLinkClass("/")}
//             >
//               <FaHome />
//               Home
//             </Link>

//             <Link
//               to="/all-jobs"
//               className={navLinkClass("/all-jobs")}
//             >
//               <FaBriefcase />
//               Jobs
//             </Link>
//             <Link
//   to="/about"
//   className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
// >
//   <FaInfoCircle />
//   About Us
// </Link>

// <Link
//   to="/contact"
//   className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
// >
//   <FaPhoneAlt />
//   Contact Us
// </Link>

//             {/* Training */}

//             {/* 
//             <Link
//               to="/training"
//               className={navLinkClass("/training")}
//             >
//               <FaGraduationCap />
//               Training
//             </Link>
//             */}

//             <Link
//               to="/mock-interview"
//               className={navLinkClass("/mock-interview")}
//             >
//               <FaVideo />
//               Mock Interview
//             </Link>
//           </div>

//           {/* =====================================================
//               DESKTOP AUTH / PROFILE
//           ===================================================== */}

//           <div className="hidden lg:flex items-center gap-4">

//             {user ? (
//               <Link
//                 to="/profile"
//                 className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
//                   isActive("/profile")
//                     ? "bg-emerald-500/10"
//                     : "hover:bg-slate-800"
//                 }`}
//               >

//                 <img
//                   src={getProfileImage()}
//                   alt={user.name || "User"}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />

//                 <div>
//                   <p className="text-white font-semibold">
//                     {user.name || "User"}
//                   </p>

//                   <p
//                     className={`text-xs ${
//                       isActive("/profile")
//                         ? "text-emerald-400"
//                         : "text-slate-400"
//                     }`}
//                   >
//                     My Profile
//                   </p>
//                 </div>
//               </Link>
//             ) : (
//               <>
//                 {/* Login */}

//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 text-white hover:text-emerald-400 transition"
//                 >
//                   <FaLock />
//                   Log In
//                 </Link>

//                 {/* Register */}

//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 bg-emerald-500 px-5 py-2 rounded-lg text-white hover:bg-emerald-600 transition"
//                 >
//                   <FaUserCircle />
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* =====================================================
//               MOBILE MENU BUTTON
//           ===================================================== */}

//           <button
//             className="lg:hidden text-white text-2xl"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           MOBILE MENU
//       ===================================================== */}

//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-900/95 backdrop-blur-md ${
//           menuOpen ? "max-h-[700px]" : "max-h-0"
//         }`}
//       >
//         <div className="px-6 py-5">

//           {/* =====================================================
//               MOBILE USER
//           ===================================================== */}

//           {user ? (
//             <Link
//               to="/profile"
//               onClick={closeMenu}
//               className={`flex items-center gap-4 p-4 rounded-2xl mb-5 border transition ${
//                 isActive("/profile")
//                   ? "bg-emerald-500/10 border-emerald-500/40"
//                   : "bg-slate-800/50 border-slate-700 hover:border-emerald-500/40"
//               }`}
//             >

//               <img
//                 src={getProfileImage()}
//                 alt={user.name || "User"}
//                 className="w-14 h-14 rounded-full object-cover"
//               />

//               <div>
//                 <h3 className="text-white font-semibold">
//                   {user.name || "User"}
//                 </h3>

//                 <p className="text-slate-400 text-sm">
//                   {user.email}
//                 </p>

//                 <p className="text-emerald-400 text-xs mt-1">
//                   View Profile
//                 </p>
//               </div>
//             </Link>
//           ) : (
//             <div className="flex gap-3 mb-5">

//               {/* Login */}

//               <Link
//                 to="/login"
//                 onClick={closeMenu}
//                 className="flex-1 flex items-center justify-center gap-2 border border-slate-700 text-white py-3 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition"
//               >
//                 <FaLock />
//                 Log In
//               </Link>

//               {/* Register */}

//               <Link
//                 to="/login"
//                 onClick={closeMenu}
//                 className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
//               >
//                 <FaUserCircle />
//                 Register
//               </Link>
//             </div>
//           )}

//           {/* =====================================================
//               MOBILE NAVIGATION
//           ===================================================== */}

//           <div className="flex flex-col gap-2">

//             <Link
//               to="/"
//               onClick={closeMenu}
//               className={navLinkClass("/")}
//             >
//               <FaHome />
//               Home
//             </Link>

//             <Link
//               to="/all-jobs"
//               onClick={closeMenu}
//               className={navLinkClass("/all-jobs")}
//             >
//               <FaBriefcase />
//               Jobs
//             </Link>

//             {/* Training */}

//             <Link
//               to="/training"
//               onClick={closeMenu}
//               className={navLinkClass("/training")}
//             >
//               <FaGraduationCap />
//               Training
//             </Link>

//             <Link
//               to="/mock-interview"
//               onClick={closeMenu}
//               className={navLinkClass("/mock-interview")}
//             >
//               <FaVideo />
//               Mock Interview
//             </Link>

//             <Link
//               to="/about"
//               onClick={closeMenu}
//               className={navLinkClass("/about")}
//             >
//               <FaInfoCircle />
//               About Us
//             </Link>

//             <Link
//               to="/contact"
//               onClick={closeMenu}
//               className={navLinkClass("/contact")}
//             >
//               <FaPhoneAlt />
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// } 



import { useState } from "react";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaBriefcase,
  FaUsers,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaGraduationCap,
  FaLaptopHouse,
  FaLayerGroup,
  FaSearch,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  /*
  ============================================================
  ACTIVE HELPERS
  ============================================================
  */

  const isActive = (path) => location.pathname === path;

  const isQueryActive = (query) =>
    location.pathname === "/jobs" && location.search === query;

  /*
  ============================================================
  CLOSE MOBILE MENU
  ============================================================
  */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /*
  ============================================================
  SEARCH JOBS
  ============================================================
  */

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) return;

    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}`);

    setSearch("");
    closeMenu();
  };

  /*
  ============================================================
  DESKTOP NAV ITEM
  ============================================================
  */

  const navItem = (active = false) =>
    `group relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-[15px] xl:text-[16px] font-semibold tracking-[-0.01em] transition-all duration-200 ${
      active
        ? "bg-emerald-50 text-emerald-700 shadow-sm"
        : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
    }`;

  /*
  ============================================================
  MOBILE NAV ITEM
  ============================================================
  */

  const mobileItem = (active = false) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
      active
        ? "bg-emerald-50 text-emerald-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-emerald-600"
    }`;

  /*
  ============================================================
  JOBS ACTIVE STATE
  ============================================================
  */

  const jobsActive =
    location.pathname.startsWith("/jobs") ||
    location.pathname === "/all-jobs";

  /*
  ============================================================
  RETURN
  ============================================================
  */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ===================================================
            NAVBAR BACKGROUND
        =================================================== */}

        <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_3px_18px_rgba(15,23,42,0.06)]">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* =================================================
                MAIN NAVBAR
            ================================================= */}

            <div className="h-[78px] lg:h-[100px] flex items-center justify-between gap-3">

              {/* =================================================
                  LOGO
              ================================================= */}

              <Link
                to="/"
                onClick={closeMenu}
                className="group flex items-center shrink-0"
              >
                <img
                  src={logo}
                  alt="TechBy"
                  className="h-10 sm:h-11 lg:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              <div className="hidden lg:flex items-center ml-7">

                <div className="flex items-center gap-1">

                  {/* =================================================
                      HOME
                  ================================================= */}

                  <Link
                    to="/"
                    aria-current={
                      isActive("/") ? "page" : undefined
                    }
                    className={navItem(isActive("/"))}
                  >
                    <FaHome
                      className={`text-[14px] transition-colors ${
                        isActive("/")
                          ? "text-emerald-600"
                          : "text-slate-400 group-hover:text-emerald-600"
                      }`}
                    />

                    <span>Home</span>

                    {isActive("/") && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-emerald-500" />
                    )}
                  </Link>

                  {/* =================================================
                      JOBS DROPDOWN
                  ================================================= */}

                  <div className="relative group">

                    {/* MAIN JOBS BUTTON */}

                    <button
                      type="button"
                      className={`
                        relative flex items-center gap-2.5
                        px-4 py-3 rounded-xl
                        text-[15px] xl:text-[16px]
                        font-semibold tracking-[-0.01em]
                        transition-all duration-200
                        ${
                          jobsActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
                        }
                      `}
                    >

                      <FaBriefcase
                        className={`text-[14px] ${
                          jobsActive
                            ? "text-emerald-600"
                            : "text-slate-400 group-hover:text-emerald-600"
                        }`}
                      />

                      <span>Jobs</span>

                      {/* DROPDOWN ARROW */}

                      <span className="text-[10px] ml-0.5 transition-transform duration-200 group-hover:rotate-180">
                        ▼
                      </span>

                      {/* NEW BADGE */}

                      <span
                        className="
                          absolute -top-2 -right-1
                          text-[9px] leading-none
                          font-bold px-1.5 py-1
                          rounded-full
                          bg-emerald-500 text-white
                          shadow-sm
                        "
                      >
                        NEW
                      </span>

                    </button>

                    {/* =================================================
                        JOBS DROPDOWN
                    ================================================= */}

                    <div
                      className="
                        absolute left-0 top-full
                        pt-3
                        invisible opacity-0 translate-y-2
                        group-hover:visible group-hover:opacity-100
                        group-hover:translate-y-0
                        transition-all duration-200
                        z-50
                      "
                    >

                      <div
                        className="
                          w-64
                          bg-white
                          border border-slate-200
                          rounded-2xl
                          shadow-xl
                          shadow-slate-900/10
                          p-2
                        "
                      >

                        {/* =================================================
                            NEW JOBS
                        ================================================= */}

                        <Link
                          to="/all-jobs"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isActive("/all-jobs")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <FaBriefcase className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              New Jobs
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Latest job openings
                            </p>
                          </div>

                        </Link>

                        {/* =================================================
                            FRESHERS
                        ================================================= */}

                        <Link
                          to="/jobs?type=freshers"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isQueryActive("?type=freshers")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <FaGraduationCap className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              Freshers
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Jobs for fresh graduates
                            </p>
                          </div>

                        </Link>

                        {/* =================================================
                            EXPERIENCED
                        ================================================= */}

                        <Link
                          to="/jobs?type=experienced"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isQueryActive("?type=experienced")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <FaUsers className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              Experienced
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Jobs for professionals
                            </p>
                          </div>

                        </Link>

                        {/* =================================================
                            INTERNSHIP
                        ================================================= */}

                        <Link
                          to="/jobs?type=internship"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isQueryActive("?type=internship")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <FaLayerGroup className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              Internship
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Internship opportunities
                            </p>
                          </div>

                        </Link>

                        {/* =================================================
                            REMOTE
                        ================================================= */}

                        <Link
                          to="/jobs?workMode=Remote"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isQueryActive("?workMode=Remote")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <FaLaptopHouse className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              Remote
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Work from anywhere
                            </p>
                          </div>

                        </Link>

                        {/* =================================================
                            HYBRID
                        ================================================= */}

                        <Link
                          to="/jobs?workMode=Hybrid"
                          className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-xl
                            transition
                            ${
                              isQueryActive("?workMode=Hybrid")
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }
                          `}
                        >

                          <span className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <FaLaptopHouse className="text-emerald-500" />
                          </span>

                          <div>
                            <p className="font-semibold text-sm">
                              Hybrid
                            </p>

                            <p className="text-[11px] text-slate-400">
                              Flexible work opportunities
                            </p>
                          </div>

                        </Link>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      GOVT JOBS & NEWS
                  ================================================= */}

                  <Link
                    to="/job-news"
                    aria-current={
                      location.pathname.startsWith("/job-news")
                        ? "page"
                        : undefined
                    }
                    className={navItem(
                      location.pathname.startsWith("/job-news")
                    )}
                  >

                    <FaGraduationCap
                      className={`text-[14px] ${
                        location.pathname.startsWith("/job-news")
                          ? "text-emerald-600"
                          : "text-slate-400 group-hover:text-emerald-600"
                      }`}
                    />

                    <span>Govt Jobs & News</span>

                    {location.pathname.startsWith("/job-news") && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-emerald-500" />
                    )}

                  </Link>

                </div>

              </div>

              {/* =================================================
                  DESKTOP SEARCH
              ================================================= */}

              <form
                onSubmit={handleSearch}
                className="
                  hidden xl:flex
                  relative
                  w-[260px]
                  2xl:w-[300px]
                  ml-auto
                "
              >

                <FaSearch
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    text-sm
                    pointer-events-none
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                  aria-label="Search jobs"
                  className="
                    w-full
                    h-11
                    pl-10
                    pr-11
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />

                <button
                  type="submit"
                  aria-label="Search jobs"
                  className="
                    absolute
                    right-1.5
                    top-1/2
                    -translate-y-1/2
                    w-8
                    h-8
                    rounded-lg
                    bg-emerald-500
                    hover:bg-emerald-600
                    text-white
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  <FaSearch className="text-xs" />
                </button>

              </form>

              {/* =================================================
                  DESKTOP JOIN BUTTON
              ================================================= */}

              <div className="hidden lg:flex items-center ml-auto xl:ml-4">

                <button
                  type="button"
                  onClick={() => setSocialOpen(true)}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-2.5
                    px-5
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-600
                    hover:from-emerald-600
                    hover:to-emerald-700
                    text-white
                    text-[15px]
                    font-semibold
                    shadow-md
                    shadow-emerald-500/20
                    hover:shadow-lg
                    hover:shadow-emerald-500/25
                    transition-all
                    duration-200
                  "
                >

                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/15">
                    <FaUsers className="text-sm" />
                  </span>

                  <span>Join Our Groups</span>

                  <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />

                </button>

              </div>

              {/* =================================================
                  MOBILE SEARCH
              ================================================= */}

              <form
                onSubmit={handleSearch}
                className="
                  lg:hidden
                  flex
                  items-center
                  flex-1
                  max-w-[250px]
                  sm:max-w-[320px]
                "
              >

                <div className="relative w-full">

                  <FaSearch
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      text-sm
                      pointer-events-none
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs..."
                    aria-label="Search jobs"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-11
                      rounded-xl
                      bg-slate-50
                      border
                      border-slate-200
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-emerald-400
                      focus:ring-4
                      focus:ring-emerald-500/10
                    "
                  />

                  <button
                    type="submit"
                    aria-label="Search jobs"
                    className="
                      absolute
                      right-1.5
                      top-1/2
                      -translate-y-1/2
                      w-8
                      h-8
                      rounded-lg
                      bg-emerald-500
                      hover:bg-emerald-600
                      text-white
                      flex
                      items-center
                      justify-center
                      transition
                    "
                  >
                    <FaSearch className="text-xs" />
                  </button>

                </div>

              </form>

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================= */}

              {/* <button
                type="button"
                aria-label={
                  menuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="
                  lg:hidden
                  shrink-0
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  rounded-xl
                  bg-slate-50
                  border
                  border-slate-200
                  text-slate-700
                  hover:text-emerald-600
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  transition-all
                  duration-200
                "
              >
                {menuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button> */}

            </div>

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >

          <div className="bg-white border-b border-slate-200 shadow-xl">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2">

                {/* =================================================
                    HOME
                ================================================= */}

                <Link
                  to="/"
                  onClick={closeMenu}
                  aria-current={
                    isActive("/") ? "page" : undefined
                  }
                  className={mobileItem(isActive("/"))}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaHome className="text-emerald-500 text-base" />
                  </span>

                  <span>Home</span>

                </Link>

                {/* =================================================
                    NEW JOBS
                ================================================= */}

                <Link
                  to="/all-jobs"
                  onClick={closeMenu}
                  aria-current={
                    isActive("/all-jobs")
                      ? "page"
                      : undefined
                  }
                  className={mobileItem(
                    isActive("/all-jobs")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <FaBriefcase className="text-base" />
                  </span>

                  <span className="flex-1">
                    New Jobs
                  </span>

                  <span className="text-[9px] font-bold bg-emerald-500 text-white px-2 py-1 rounded-full">
                    NEW
                  </span>

                </Link>

                {/* =================================================
                    FRESHERS
                ================================================= */}

                <Link
                  to="/jobs?type=freshers"
                  onClick={closeMenu}
                  className={mobileItem(
                    isQueryActive("?type=freshers")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaGraduationCap className="text-emerald-500 text-base" />
                  </span>

                  <span>Freshers</span>

                </Link>

                {/* =================================================
                    EXPERIENCED
                ================================================= */}

                <Link
                  to="/jobs?type=experienced"
                  onClick={closeMenu}
                  className={mobileItem(
                    isQueryActive("?type=experienced")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaUsers className="text-emerald-500 text-base" />
                  </span>

                  <span>Experienced</span>

                </Link>

                {/* =================================================
                    INTERNSHIP
                ================================================= */}

                <Link
                  to="/jobs?type=internship"
                  onClick={closeMenu}
                  className={mobileItem(
                    isQueryActive("?type=internship")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaLayerGroup className="text-emerald-500 text-base" />
                  </span>

                  <span>Internship</span>

                </Link>

                {/* =================================================
                    REMOTE
                ================================================= */}

                <Link
                  to="/jobs?workMode=Remote"
                  onClick={closeMenu}
                  className={mobileItem(
                    isQueryActive("?workMode=Remote")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaLaptopHouse className="text-emerald-500 text-base" />
                  </span>

                  <span>Remote</span>

                </Link>

                {/* =================================================
                    HYBRID
                ================================================= */}

                <Link
                  to="/jobs?workMode=Hybrid"
                  onClick={closeMenu}
                  className={mobileItem(
                    isQueryActive("?workMode=Hybrid")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaLaptopHouse className="text-emerald-500 text-base" />
                  </span>

                  <span>Hybrid</span>

                </Link>

                {/* =================================================
                    GOVT JOBS & NEWS
                ================================================= */}

                <Link
                  to="/job-news"
                  onClick={closeMenu}
                  className={mobileItem(
                    location.pathname.startsWith("/job-news")
                  )}
                >

                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <FaGraduationCap className="text-emerald-500 text-base" />
                  </span>

                  <span>Govt Jobs & News</span>

                </Link>

                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div className="my-2 border-t border-slate-200" />

                {/* =================================================
                    JOIN GROUPS
                ================================================= */}

                <button
                  type="button"
                  onClick={() => {
                    setSocialOpen(true);
                    closeMenu();
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2.5
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-600
                    hover:from-emerald-600
                    hover:to-emerald-700
                    text-white
                    py-3.5
                    rounded-xl
                    text-[15px]
                    font-semibold
                    shadow-md
                    shadow-emerald-500/20
                    transition-all
                    duration-200
                  "
                >

                  <FaUsers />

                  Join Our Groups

                </button>

              </div>

            </div>

          </div>

        </div>

      </nav>

      {/* =====================================================
          SOCIAL POPUP
      ===================================================== */}

      {socialOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-slate-950/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            px-5
          "
          onClick={() => setSocialOpen(false)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-md
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-7
              shadow-2xl
            "
          >

            {/* =================================================
                CLOSE
            ================================================= */}

            <button
              type="button"
              onClick={() => setSocialOpen(false)}
              aria-label="Close community popup"
              className="
                absolute
                top-5
                right-5
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-xl
                text-slate-400
                hover:text-slate-700
                hover:bg-slate-100
                transition
              "
            >
              <FaTimes />
            </button>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="text-center mb-7">

              <div className="relative w-16 h-16 mx-auto">

                <div className="absolute inset-0 rounded-2xl bg-emerald-100 animate-pulse opacity-50" />

                <div className="relative w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">

                  <FaUsers className="text-emerald-500 text-3xl" />

                </div>

              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-4">
                Join Our Job Community
              </h2>

              <p className="text-slate-500 mt-2 text-sm leading-6 max-w-sm mx-auto">
                Get the latest job updates directly
                on your favorite platform.
              </p>

            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="space-y-3">

              {/* WHATSAPP */}

              <a
                href="https://chat.whatsapp.com/CimbUfCYdUnGLTAKJLThWR"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  hover:bg-emerald-50
                  border
                  border-slate-200
                  hover:border-emerald-300
                  rounded-2xl
                  p-4
                  transition-all
                  duration-200
                "
              >

                <div className="w-11 h-11 shrink-0 rounded-xl bg-green-500 flex items-center justify-center text-white text-xl shadow-sm">
                  <FaWhatsapp />
                </div>

                <div className="text-left flex-1">

                  <h3 className="text-slate-900 font-semibold">
                    WhatsApp Group
                  </h3>

                  <p className="text-slate-500 text-sm mt-0.5">
                    Get job updates on WhatsApp
                  </p>

                </div>

                <span className="text-slate-300 group-hover:text-emerald-500 text-lg transition">
                  →
                </span>

              </a>

              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/mr_vansh_s?igsi=MWtvd24yOGxwamlm"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  hover:bg-pink-50
                  border
                  border-slate-200
                  hover:border-pink-200
                  rounded-2xl
                  p-4
                  transition-all
                  duration-200
                "
              >

                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-sm">
                  <FaInstagram />
                </div>

                <div className="text-left flex-1">

                  <h3 className="text-slate-900 font-semibold">
                    Instagram
                  </h3>

                  <p className="text-slate-500 text-sm mt-0.5">
                    Follow us for job updates
                  </p>

                </div>

                <span className="text-slate-300 group-hover:text-pink-500 text-lg transition">
                  →
                </span>

              </a>

              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/company/techby-consultancy-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  bg-slate-50
                  hover:bg-blue-50
                  border
                  border-slate-200
                  hover:border-blue-200
                  rounded-2xl
                  p-4
                  transition-all
                  duration-200
                "
              >

                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-sm">
                  <FaLinkedin />
                </div>

                <div className="text-left flex-1">

                  <h3 className="text-slate-900 font-semibold">
                    LinkedIn
                  </h3>

                  <p className="text-slate-500 text-sm mt-0.5">
                    Follow our professional updates
                  </p>

                </div>

                <span className="text-slate-300 group-hover:text-blue-500 text-lg transition">
                  →
                </span>

              </a>

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="mt-6 pt-5 border-t border-slate-100">

              <p className="text-center text-slate-400 text-xs">
                Join our communities and never miss a
                job opportunity.
              </p>

            </div>

          </div>

        </div>
      )}

    </>
  );
}