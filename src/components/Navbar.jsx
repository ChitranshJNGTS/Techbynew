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
    FaMobileAlt,
  FaBell,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
// import { useLocation } from "react-router-dom";
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
// const location = useLocation();

const isVendorTracker = location.pathname === "/vendor-tracker";
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

             
<button
  type="button"
  onClick={() => window.location.href = "/vendor-tracker"}
  className={`
    group relative hidden lg:flex items-center gap-2.5
    px-5 py-3 rounded-xl
    ${isVendorTracker
      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20"
      : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/20"
    }
    text-white text-[15px] font-semibold
    shadow-md hover:shadow-lg transition-all duration-200
  `}
>
  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/15">
    <FaUsers className="text-sm" />
  </span>

  <span>Vendor Portal</span>

  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
</button>

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
    w-full flex items-center justify-center gap-2.5
    bg-gradient-to-r from-emerald-500 to-emerald-600
    hover:from-emerald-600 hover:to-emerald-700
    text-white py-3.5 rounded-xl text-[15px]
    font-semibold shadow-md shadow-emerald-500/20
    transition-all duration-200
  "
>
  <FaMobileAlt />
  Download TechBy App
  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full">
    SOON
  </span>
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
    className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center px-5"
    onClick={() => setSocialOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-popup-title"
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-md overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-2xl"
    >
      {/* Top decorative section */}
      <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-6 pt-8 pb-12 text-center overflow-hidden">
        <div className="absolute -top-12 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-8 w-44 h-44 rounded-full bg-white/10" />

        <button
          type="button"
          onClick={() => setSocialOpen(false)}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl text-white hover:bg-white/15 transition"
        >
          <FaTimes />
        </button>

        <div className="relative mx-auto w-24 h-24 rounded-[26px] bg-white shadow-xl flex items-center justify-center">
          <FaMobileAlt className="text-emerald-600 text-5xl" />
          <span className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-amber-400 border-4 border-emerald-600 flex items-center justify-center text-slate-900">
            <FaRocket className="text-sm" />
          </span>
        </div>

        <p className="relative mt-5 text-emerald-50 text-xs font-bold uppercase tracking-[0.2em]">
          Something exciting is coming
        </p>

        <h2
          id="app-popup-title"
          className="relative mt-2 text-3xl font-extrabold text-white"
        >
          TechBy App
        </h2>

        <p className="relative mt-2 text-emerald-50 text-sm">
          Your career opportunities, all in one place.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pt-7 pb-6 -mt-4 relative bg-white rounded-t-3xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            APP UNDER DEVELOPMENT
          </span>
        </div>

        <h3 className="mt-5 text-center text-xl font-bold text-slate-900">
          Launching Soon!
        </h3>

        <p className="mt-3 text-center text-sm text-slate-500 leading-6">
          We’re working hard to bring you the TechBy mobile app.
          Soon, you’ll be able to discover job opportunities
          and get career updates more conveniently.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <FaBriefcase className="mx-auto text-emerald-600 text-xl" />
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Latest Jobs
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Explore opportunities
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <FaBell className="mx-auto text-emerald-600 text-xl" />
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Career Updates
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Stay informed
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSocialOpen(false)}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 font-semibold transition-colors"
        >
          <FaRocket />
          Got It — Coming Soon
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          Until launch, keep exploring{" "}
          <a
            href="https://techby.in/jobs"
            onClick={() => setSocialOpen(false)}
            className="font-semibold text-emerald-600 hover:underline"
          >
            jobs on TechBy
          </a>.
        </p>
      </div>
    </div>
  </div>
)}

    </>
  );
}