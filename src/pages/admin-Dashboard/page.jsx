import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaBars,
  FaUserCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaTruck,
  FaShoppingCart,
  FaHeadset,
  FaVideo,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import PostJob from "../PostJob/page";
import AdminApplications from "../../components/AdminApplications";
import AdminCreateInterview from "../../components/AdminCreateInterview";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "Dashboard"
  );

  const [storeProfile] = useState({
    name: "Chitransh Jawre",
    shopLogo: null,
  });

  const [loading] = useState(false);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("activeMenu");

    navigate("/admin/login", { replace: true });
  };

  // ================= MENU =================

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Post Job",
      icon: <FaBriefcase />,
    },
    {
      name: "Applications",
      icon: <FaClipboardList />,
    },
    {
      name: "Create Interview",
      icon: <FaVideo />,
    },
    {
      name: "Book Delivery",
      icon: <FaTruck />,
    },
    {
      name: "Buy Pack",
      icon: <FaShoppingCart />,
    },
    {
      name: "Help & Support",
      icon: <FaHeadset />,
    },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);

    localStorage.setItem("activeMenu", menuName);

    setSidebarOpen(false);
  };

  // ================= PAGE CONTENT =================

  const renderContent = () => {
    switch (activeMenu) {
      case "Post Job":
        return <PostJob />;

      case "Applications":
        return <AdminApplications />;

      case "Create Interview":
        return <AdminCreateInterview />;

      case "Dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome to your admin dashboard.
            </p>

            {/* Dashboard cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                  Total Jobs
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                  0
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                  Applications
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                  0
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500">
                  Interviews
                </p>

                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                  0
                </h3>
              </div>

            </div>
          </div>
        );

      case "Book Delivery":
        return (
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold">
              Book Delivery
            </h2>

            <p className="text-gray-500 mt-2">
              Delivery management will appear here.
            </p>
          </div>
        );

      case "Buy Pack":
        return (
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold">
              Buy Pack
            </h2>

            <p className="text-gray-500 mt-2">
              Pack management will appear here.
            </p>
          </div>
        );

      case "Help & Support":
        return (
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold">
              Help & Support
            </h2>

            <p className="text-gray-500 mt-2">
              Support section will appear here.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">

      {/* ================= OVERLAY ================= */}

      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black/30 transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-full
          bg-white text-gray-800
          flex flex-col
          transition-transform duration-300
          w-64 shadow-xl
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:relative
          lg:translate-x-0
          lg:w-64
        `}
      >

        {/* LOGO */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
              W
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                TechBy
              </h2>

              <p className="text-xs text-gray-500">
                Admin Panel
              </p>
            </div>

          </div>

          <button
            className="text-gray-600 lg:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <FaBars />
          </button>

        </div>

        {/* MENU */}

        <nav className="mt-6 flex-1 flex flex-col px-3">

          {menuItems.map((item) => (

            <button
              key={item.name}
              type="button"
              className={`
                flex items-center gap-4
                cursor-pointer
                px-4 py-3
                rounded-xl
                transition-all
                mb-2
                text-left
                ${
                  activeMenu === item.name
                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }
              `}
              onClick={() => handleMenuClick(item.name)}
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </button>

          ))}

        </nav>

        {/* PROFILE */}

        <div className="border-t border-gray-200 p-4 bg-gray-50">

          <div className="flex items-center gap-3">

            <img
              src={
                storeProfile.shopLogo ||
                "https://i.pravatar.cc/100"
              }
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border"
            />

            <div className="flex flex-col flex-1">

              <p className="text-sm font-semibold text-gray-800">
                {storeProfile.name}
              </p>

              <button className="flex items-center text-xs text-blue-600 hover:underline mt-1">
                <FaUserCircle className="mr-1" />
                Profile
              </button>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={() => setShowLogoutModal(true)}
            className="
              mt-4 w-full
              px-4 py-2
              text-white
              bg-red-500
              hover:bg-red-600
              rounded-lg
              text-sm
              font-medium
              flex items-center
              justify-center
              gap-2
            "
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP NAVBAR */}

        <header className="flex items-center justify-between bg-white shadow px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-4">

            <button
              className="text-gray-600 lg:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {activeMenu}
              </h1>

              <p className="text-xs text-gray-500">
                TechBy Admin Panel
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <span className="text-gray-600 hidden md:block font-medium">
              {storeProfile.name}
            </span>

            <img
              src={
                storeProfile.shopLogo ||
                "https://i.pravatar.cc/100"
              }
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border"
            />

          </div>

        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main className="flex-1 overflow-auto">

          {renderContent()}

        </main>

      </div>

      {/* ================= LOGOUT MODAL ================= */}

      {showLogoutModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">

          <div className="bg-white w-[320px] p-6 rounded-xl shadow-lg text-center">

            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="
                  flex-1
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-700
                  py-2
                  rounded-lg
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="
                  flex-1
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-2
                  rounded-lg
                "
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

export default AdminDashboard;