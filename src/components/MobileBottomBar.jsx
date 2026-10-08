import {
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaNewspaper,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

export default function MobileBottomBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const isQueryActive = (query) =>
    location.pathname === "/jobs" && location.search === query;

  const itemClass = (active) =>
    `relative flex flex-col items-center justify-center gap-1 h-full flex-1 transition duration-200 ${
      active
        ? "text-emerald-600"
        : "text-slate-500 hover:text-emerald-600"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">

      <div className="h-16 flex items-center">

        {/* =================================================
            HOME
        ================================================= */}

        <Link
          to="/"
          className={itemClass(isActive("/"))}
        >
          {isActive("/") && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
          )}

          <FaHome className="text-lg" />

          <span className="text-[10px] font-medium">
            Home
          </span>
        </Link>


        {/* =================================================
            JOBS
        ================================================= */}

        <Link
          to="/all-jobs"
          className={itemClass(isActive("/all-jobs"))}
        >
          {isActive("/all-jobs") && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
          )}

          <FaBriefcase className="text-lg" />

          <span className="text-[10px] font-medium">
            Jobs
          </span>
        </Link>


        {/* =================================================
            FRESHERS
        ================================================= */}

        <Link
          to="/jobs?type=freshers"
          className={itemClass(
            isQueryActive("?type=freshers")
          )}
        >
          {isQueryActive("?type=freshers") && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
          )}

          <FaGraduationCap className="text-lg" />

          <span className="text-[10px] font-medium">
            Freshers
          </span>
        </Link>


        {/* =================================================
            REMOTE
        ================================================= */}

        <Link
          to="/jobs?workMode=Remote"
          className={itemClass(
            isQueryActive("?workMode=Remote")
          )}
        >
          {isQueryActive("?workMode=Remote") && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
          )}

          <FaGlobe className="text-lg" />

          <span className="text-[10px] font-medium">
            Remote
          </span>
        </Link>


        {/* =================================================
            GOVT NEWS
        ================================================= */}

        <Link
          to="/job-news"
          className={itemClass(
            isActive("/job-news")
          )}
        >
          {isActive("/job-news") && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
          )}

          <FaNewspaper className="text-lg" />

          <span className="text-[10px] font-medium">
            Govt News
          </span>
        </Link>

      </div>
    </div>
  );
}