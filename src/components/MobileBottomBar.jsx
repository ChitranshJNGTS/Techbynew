import {
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

export default function MobileBottomBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const isQueryActive = (query) => location.search === query;

  const itemClass = (active) =>
    `flex flex-col items-center justify-center gap-1 h-full flex-1 transition ${
      active
        ? "text-emerald-400"
        : "text-slate-400 hover:text-emerald-400"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl">

      <div className="h-16 flex items-center">

        {/* HOME */}
        <Link
          to="/"
          className={itemClass(isActive("/"))}
        >
          <FaHome className="text-lg" />

          <span className="text-[10px] font-medium">
            Home
          </span>
        </Link>


        {/* JOBS */}
        <Link
          to="/all-jobs"
          className={itemClass(isActive("/all-jobs"))}
        >
          <FaBriefcase className="text-lg" />

          <span className="text-[10px] font-medium">
            Jobs
          </span>
        </Link>


        {/* FRESHERS */}
        <Link
          to="/jobs?type=freshers"
          className={itemClass(
            isQueryActive("?type=freshers")
          )}
        >
          <FaGraduationCap className="text-lg" />

          <span className="text-[10px] font-medium">
            Freshers
          </span>
        </Link>


        {/* REMOTE */}
        <Link
          to="/jobs?workMode=Remote"
          className={itemClass(
            isQueryActive("?workMode=Remote")
          )}
        >
          <FaGlobe className="text-lg" />

          <span className="text-[10px] font-medium">
            Remote
          </span>
        </Link>


        {/* COMMUNITY */}
        <Link
          to="/community"
          className={itemClass(
            isActive("/community")
          )}
        >
          <FaUsers className="text-lg" />

          <span className="text-[10px] font-medium">
            Community
          </span>
        </Link>

      </div>
    </div>
  );
}