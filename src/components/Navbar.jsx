import { useEffect, useState } from "react";
import { FaUserCircle, FaLock, FaBars, FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar({ onLoginClick }) {
 const [menuOpen, setMenuOpen] = useState(false);
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  return (
   <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 lg:h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-green-500 font-bold text-xl lg:text-2xl">
              TB
            </span>
          </div>

          <h1 className="text-2xl lg:text-4xl font-semibold text-white">
            Tech<span className="font-light">By</span>
          </h1>
        </Link>

       {/* Desktop Menu */}
<ul className="hidden lg:flex items-center gap-10 text-white font-medium">
  <li>
    <Link
      to="/"
      className="hover:text-green-400 transition"
    >
      Home
    </Link>
  </li>


  <li>
    <Link
      to="/all-jobs"
      className="hover:text-green-400 transition"
    >
      Jobs
    </Link>
  </li>

  <li>
    <Link
      to="/book-interview"
      className="hover:text-green-400 transition"
    >
      Book Interview
    </Link>
  </li>

 
</ul>

        {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center gap-6">

  {user ? (

    <Link
      to="/profile"
      className="flex items-center gap-3 hover:bg-slate-800 px-3 py-2 rounded-xl transition"
    >

      <img
        src={
          user.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=10b981&color=fff`
        }
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>

        <p className="text-white font-semibold">
          {user.name}
        </p>

        <p className="text-slate-400 text-xs">
          My Profile
        </p>

      </div>

    </Link>

  ) : (

    <>
      <Link
        to="/login"
        className="flex items-center gap-2 text-white hover:text-green-400 transition"
      >
        <FaLock />
        Log In
      </Link>

      <Link
        to="/login"
        className="flex items-center gap-2 bg-green-500 px-5 py-2 rounded-lg text-white hover:bg-green-600 transition"
      >
        <FaUserCircle />
        Register
      </Link>
    </>

  )}

</div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-900/95 backdrop-blur-md ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
       <ul className="flex flex-col px-6 py-4 text-white font-medium">

  <li className="py-3 border-b border-slate-700">
    <Link
      to="/"
      className="block hover:text-green-400"
      onClick={() => setMenuOpen(false)}
    >
      Home
    </Link>
  </li>

  <li className="py-3 border-b border-slate-700">
    <Link
      to="/about"
      className="block hover:text-green-400"
      onClick={() => setMenuOpen(false)}
    >
      About Us
    </Link>
  </li>

  <li className="py-3 border-b border-slate-700">
    <Link
      to="/all-jobs"
      className="block hover:text-green-400"
      onClick={() => setMenuOpen(false)}
    >
      Jobs
    </Link>
  </li>

  <li className="py-3 border-b border-slate-700">
    <Link
      to="/book-interview"
      className="block hover:text-green-400"
      onClick={() => setMenuOpen(false)}
    >
      Book Interview
    </Link>
  </li>

  <li className="py-3 border-b border-slate-700">
    <Link
      to="/contact"
      className="block hover:text-green-400"
      onClick={() => setMenuOpen(false)}
    >
      Contact Us
    </Link>
  </li>

 {user ? (

<div className="mt-5 border-t border-slate-700 pt-5">

  <Link
    to="/profile"
    onClick={() => setMenuOpen(false)}
    className="flex items-center gap-4"
  >

    <img
      src={
        user.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=10b981&color=fff`
      }
      alt={user.name}
      className="w-14 h-14 rounded-full"
    />

    <div>

      <h3 className="text-white font-semibold">
        {user.name}
      </h3>

      <p className="text-slate-400 text-sm">
        View Profile
      </p>

    </div>

  </Link>

</div>

) : (

<div className="flex flex-col gap-3 mt-5">

  <Link
    to="/login"
    onClick={() => setMenuOpen(false)}
    className="flex items-center justify-center gap-2 border border-green-500 rounded-lg py-3 hover:bg-green-500 transition"
  >
    <FaLock />
    Log In
  </Link>

  <Link
    to="/login"
    onClick={() => setMenuOpen(false)}
    className="flex items-center justify-center gap-2 bg-green-500 rounded-lg py-3 hover:bg-green-600 transition"
  >
    <FaUserCircle />
    Register
  </Link>

</div>

)}

</ul>
      </div>
    </nav>
  );
}