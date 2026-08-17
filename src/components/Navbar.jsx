
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





import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaLock,
  FaBars,
  FaTimes,
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaVideo,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase";

import API from "../Api/JobApi";

export default function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // =====================================================
  // FIREBASE AUTH + MONGODB PROFILE
  // =====================================================

  useEffect(() => {
    let unsubscribe;

    const checkUser = async () => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          // Firebase user is authenticated
          const firebaseToken = await firebaseUser.getIdToken();

          // Get MongoDB profile
          const response = await API.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${firebaseToken}`,
            },
          });

          if (response.data.success) {
            const mongoUser = response.data.user;

            setUser({
              ...mongoUser,

              // Firebase fallback values
              uid: firebaseUser.uid,
              email: firebaseUser.email || mongoUser?.email || "",
              name:
                mongoUser?.name ||
                firebaseUser.displayName ||
                "User",

              photoURL:
                mongoUser?.photoURL ||
                firebaseUser.photoURL ||
                "",
            });

            // Optional:
            // Keep user information in localStorage
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...mongoUser,
                uid: firebaseUser.uid,
                email:
                  firebaseUser.email ||
                  mongoUser?.email ||
                  "",
                name:
                  mongoUser?.name ||
                  firebaseUser.displayName ||
                  "User",
                photoURL:
                  mongoUser?.photoURL ||
                  firebaseUser.photoURL ||
                  "",
              })
            );
          }
        } catch (error) {
          console.error("Navbar profile error:", error);

          // If MongoDB profile doesn't exist yet,
          // still show Firebase user.
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "User",
            photoURL: firebaseUser.photoURL || "",
            role: "candidate",
          });
        } finally {
          setLoading(false);
        }
      });
    };

    checkUser();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // =====================================================
  // ACTIVE LINK
  // =====================================================

  const isActive = (path) => location.pathname === path;

  // =====================================================
  // NAV LINK CLASS
  // =====================================================

  const navLinkClass = (path) =>
    `flex items-center gap-2 transition px-3 py-2 rounded-lg ${
      isActive(path)
        ? "text-emerald-400 bg-emerald-500/10"
        : "text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
    }`;

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const getProfileImage = () => {
    if (user?.photoURL) {
      return user.photoURL;
    }

    const name = user?.name || "User";

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=10b981&color=fff`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-green-500 font-bold text-xl lg:text-2xl">
                  TB
                </span>
              </div>

              <h1 className="text-2xl lg:text-4xl font-semibold text-white">
                Tech<span className="font-light">By</span>
              </h1>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
              <span className="text-green-500 font-bold text-xl lg:text-2xl">
                TB
              </span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-semibold text-white">
              Tech<span className="font-light">By</span>
            </h1>
          </Link>

          {/* =====================================================
              DESKTOP MENU
          ===================================================== */}

          <div className="hidden lg:flex items-center gap-2">

            <Link
              to="/"
              className={navLinkClass("/")}
            >
              <FaHome />
              Home
            </Link>

            <Link
              to="/all-jobs"
              className={navLinkClass("/all-jobs")}
            >
              <FaBriefcase />
              Jobs
            </Link>
            <Link
  to="/about"
  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
>
  <FaInfoCircle />
  About Us
</Link>

<Link
  to="/contact"
  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
>
  <FaPhoneAlt />
  Contact Us
</Link>

            {/* Training */}

            {/* 
            <Link
              to="/training"
              className={navLinkClass("/training")}
            >
              <FaGraduationCap />
              Training
            </Link>
            */}

            <Link
              to="/mock-interview"
              className={navLinkClass("/mock-interview")}
            >
              <FaVideo />
              Mock Interview
            </Link>
          </div>

          {/* =====================================================
              DESKTOP AUTH / PROFILE
          ===================================================== */}

          <div className="hidden lg:flex items-center gap-4">

            {user ? (
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                  isActive("/profile")
                    ? "bg-emerald-500/10"
                    : "hover:bg-slate-800"
                }`}
              >

                <img
                  src={getProfileImage()}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-white font-semibold">
                    {user.name || "User"}
                  </p>

                  <p
                    className={`text-xs ${
                      isActive("/profile")
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    My Profile
                  </p>
                </div>
              </Link>
            ) : (
              <>
                {/* Login */}

                <Link
                  to="/login"
                  className="flex items-center gap-2 text-white hover:text-emerald-400 transition"
                >
                  <FaLock />
                  Log In
                </Link>

                {/* Register */}

                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-emerald-500 px-5 py-2 rounded-lg text-white hover:bg-emerald-600 transition"
                >
                  <FaUserCircle />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-900/95 backdrop-blur-md ${
          menuOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-5">

          {/* =====================================================
              MOBILE USER
          ===================================================== */}

          {user ? (
            <Link
              to="/profile"
              onClick={closeMenu}
              className={`flex items-center gap-4 p-4 rounded-2xl mb-5 border transition ${
                isActive("/profile")
                  ? "bg-emerald-500/10 border-emerald-500/40"
                  : "bg-slate-800/50 border-slate-700 hover:border-emerald-500/40"
              }`}
            >

              <img
                src={getProfileImage()}
                alt={user.name || "User"}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="text-white font-semibold">
                  {user.name || "User"}
                </h3>

                <p className="text-slate-400 text-sm">
                  {user.email}
                </p>

                <p className="text-emerald-400 text-xs mt-1">
                  View Profile
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex gap-3 mb-5">

              {/* Login */}

              <Link
                to="/login"
                onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-700 text-white py-3 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition"
              >
                <FaLock />
                Log In
              </Link>

              {/* Register */}

              <Link
                to="/login"
                onClick={closeMenu}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
              >
                <FaUserCircle />
                Register
              </Link>
            </div>
          )}

          {/* =====================================================
              MOBILE NAVIGATION
          ===================================================== */}

          <div className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={closeMenu}
              className={navLinkClass("/")}
            >
              <FaHome />
              Home
            </Link>

            <Link
              to="/all-jobs"
              onClick={closeMenu}
              className={navLinkClass("/all-jobs")}
            >
              <FaBriefcase />
              Jobs
            </Link>

            {/* Training */}

            <Link
              to="/training"
              onClick={closeMenu}
              className={navLinkClass("/training")}
            >
              <FaGraduationCap />
              Training
            </Link>

            <Link
              to="/mock-interview"
              onClick={closeMenu}
              className={navLinkClass("/mock-interview")}
            >
              <FaVideo />
              Mock Interview
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className={navLinkClass("/about")}
            >
              <FaInfoCircle />
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className={navLinkClass("/contact")}
            >
              <FaPhoneAlt />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}