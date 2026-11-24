import {
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaNewspaper,
  FaUsers,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

export default function MobileBottomBar() {
  const location = useLocation();

  const isVendorTracker = location.pathname === "/vendor-tracker";

  const activeColor = isVendorTracker
    ? "text-orange-600"
    : "text-emerald-600";

  const activeBarColor = isVendorTracker
    ? "bg-orange-500"
    : "bg-emerald-500";

  const isActive = (path) => location.pathname === path;

  const isQueryActive = (query) =>
    location.pathname === "/jobs" && location.search === query;

  const itemClass = (active) =>
    `relative flex flex-col items-center justify-center gap-1 h-full flex-1 transition duration-200 ${
      active
        ? activeColor
        : "text-slate-500 hover:text-emerald-600"
    }`;

  const activeIndicator = (active) =>
    active && (
      <span
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 ${activeBarColor} rounded-full`}
      />
    );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
      <div className="h-16 flex items-center">

        {/* HOME */}
        <Link to="/" className={itemClass(isActive("/"))}>
          {activeIndicator(isActive("/"))}
          <FaHome className="text-lg" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* JOBS */}
        <Link to="/all-jobs" className={itemClass(isActive("/all-jobs"))}>
          {activeIndicator(isActive("/all-jobs"))}
          <FaBriefcase className="text-lg" />
          <span className="text-[10px] font-medium">Jobs</span>
        </Link>

        {/* FRESHERS */}
        <Link
          to="/jobs?type=freshers"
          className={itemClass(isQueryActive("?type=freshers"))}
        >
          {activeIndicator(isQueryActive("?type=freshers"))}
          <FaGraduationCap className="text-lg" />
          <span className="text-[10px] font-medium">Freshers</span>
        </Link>

        {/* REMOTE */}
        <Link
          to="/jobs?workMode=Remote"
          className={itemClass(isQueryActive("?workMode=Remote"))}
        >
          {activeIndicator(isQueryActive("?workMode=Remote"))}
          <FaGlobe className="text-lg" />
          <span className="text-[10px] font-medium">Remote</span>
        </Link>

        {/* GOVT NEWS */}
        <Link to="/job-news" className={itemClass(isActive("/job-news"))}>
          {activeIndicator(isActive("/job-news"))}
          <FaNewspaper className="text-lg" />
          <span className="text-[10px] font-medium">Govt News</span>
        </Link>

        {/* VENDOR TRACKER */}
        <Link
          to="/vendor-tracker"
          className={itemClass(isVendorTracker)}
        >
          {activeIndicator(isVendorTracker)}
          <FaUsers className="text-lg" />
          <span className="text-[10px] font-medium">Vendor</span>
        </Link>

      </div>
    </div>
  );
}