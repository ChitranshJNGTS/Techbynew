
import React, { useState } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  Headset,
  Bell,
  Building2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
// Recruiter pages
import JobRequirements from "../../dashboard/components/JobRequirements";
import MySubmissions from "../../dashboard/components/MySubmissions";
import Candidates from "../../dashboard/components/Candidates";
import VendorManagement from "../../dashboard/components/VendorManagement";
import RDashboard from "../../dashboard/components/RDashboard";
import RecruiterSettings from "../../dashboard/components/RecruiterSettings";
import HelpSupport from "../../dashboard/components/HelpSupport";
// import RecruiterSettings from "./RecruiterSettings";
// import HelpSupport from "../HelpSupport";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("recruiterActiveMenu") || "Overview"
  );

  const [profile] = useState({
    name: "Chitransh Jawre",
    role: "US IT Recruiter",
    avatar: null,
  });

  // LOGOUT
const handleLogout = async () => {
  try {
    await signOut(auth);

    console.log("Firebase recruiter logout successful");
  } catch (error) {
    console.error("Firebase logout error:", error);
  } finally {
    localStorage.removeItem("recruiterToken");
    localStorage.removeItem("recruiterActiveMenu");

    setShowLogoutModal(false);

    navigate("/recruiter/login", { replace: true });
  }
};

  // SIDEBAR MENU
  const menuItems = [
    {
      name: "Overview",
      icon: <LayoutDashboard size={19} />,
    },
    {
      name: "Job Requirements",
      icon: <BriefcaseBusiness size={19} />,
    },
    {
      name: "My Submissions",
      icon: <FileText size={19} />,
      count: 8,
    },
    // {
    //   name: "Candidates",
    //   icon: <Users size={19} />,
    // },
    // {
    //   name: "Vendor Management",
    //   icon: <Building2 size={19} />,
    // },
    {
      name: "Settings",
      icon: <Settings size={19} />,
    },
    {
      name: "Help & Support",
      icon: <Headset size={19} />,
    },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    localStorage.setItem("recruiterActiveMenu", menuName);
    setSidebarOpen(false);
  };

  // PAGE CONTENT
  const renderContent = () => {
    switch (activeMenu) {
      case "Overview":
        return <RDashboard/>;

      case "Job Requirements":
        return <JobRequirements />;

      case "My Submissions":
        return <MySubmissions />;

      // case "Candidates":
      //   return <Candidates />;

      // case "Vendor Management":
      //   return <VendorManagement />;

      case "Settings":
        return <RecruiterSettings />;

      case "Help & Support":
        return <HelpSupport />;

      default:
        return <div>Page not found.</div>;
    }
  };

  const avatar = profile.avatar || "https://i.pravatar.cc/100?img=12";

  return (
    <div className="flex h-screen bg-[#f6f8fb] overflow-hidden font-sans">

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-72 bg-slate-950 text-white flex flex-col transition-transform duration-300 shadow-xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0`}
      >

        {/* LOGO */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl font-black">
              T
            </div>

            <div>
              <h2 className="font-bold text-xl tracking-tight">
                TECH<span className="text-emerald-400">BY</span>
              </h2>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">
                Recruiter Workspace
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-500 px-3 mb-4">
            Workspace
          </p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleMenuClick(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition-all text-sm
                ${
                  activeMenu === item.name
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 font-semibold"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </span>

              {item.count && (
                <span className="text-xs bg-white/15 px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* PROFILE */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="Profile"
              className="h-11 w-11 rounded-full object-cover border border-white/20"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {profile.name}
              </p>
              <p className="text-xs text-slate-400">
                {profile.role}
              </p>
            </div>

            <button
              onClick={() => handleMenuClick("Settings")}
              className="text-slate-400 hover:text-white"
              title="Settings"
            >
              <UserCircle size={19} />
            </button>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/15 text-slate-300 hover:text-red-400 text-sm transition"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* TOP NAVBAR */}
        <header className="h-[72px] shrink-0 flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                {activeMenu}
              </h1>
              <p className="hidden sm:block text-xs text-slate-500">
                TechBy Recruiter Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800">
                {profile.name}
              </p>
              <p className="text-xs text-slate-500">
                {profile.role}
              </p>
            </div>

            <img
              src={avatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border border-slate-200"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>

          <footer className="px-6 lg:px-8 py-5 border-t border-slate-200 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} TechBy Consultancy Services. All rights reserved.
          </footer>
        </main>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              Confirm Logout
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to logout from your recruiter account?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
