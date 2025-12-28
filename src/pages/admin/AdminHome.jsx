import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiImage,
  FiShoppingCart,
  FiTrendingUp,
  FiPlusCircle,
  FiSettings,
  FiHome,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function AdminHome() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: "Total Orders", value: "1,248", icon: <FiShoppingCart /> },
    { title: "Uploaded Photos", value: "6,320", icon: <FiImage /> },
    { title: "Customers", value: "842", icon: <FiUsers /> },
    { title: "Monthly Growth", value: "+18%", icon: <FiTrendingUp /> },
  ];

  const quickActions = [
    {
      title: "Add New Package",
      icon: <FiPlusCircle />,
      link: "/admin/add-package",
    },
    {
      title: "Manage Orders",
      icon: <FiShoppingCart />,
      link: "/admin/manageOrders",
    },
    { title: "Gallery Management", icon: <FiImage />, link: "/admin/gallery" },
    { title: "Admin Settings", icon: <FiSettings />, link: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#141414] text-gray-300">
      {/* Sidebar */}
      <div
        className={`flex flex-col h-screen fixed z-20 top-0 left-0 bg-[#1a1a1a] border-r border-[#2a2a2a] transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-22"
        }`}
      >
        {/* Header + Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-[#E6C2A1]">Admin</h1>
          ) : (
            <div className="w-0"></div> 
          )}

          {/* Toggle button */}
          <button
            className={`text-gray-400 hover:text-white transition 
                  ${sidebarOpen ? "text-xl" : "text-lg mx-auto"}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#2a2a2a] transition
      ${sidebarOpen ? "justify-start" : "justify-center"}`}
          >
            <FiHome className="text-xl text-[#E6C2A1]" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#2a2a2a] transition
        ${sidebarOpen ? "justify-start" : "justify-center"}`}
            >
              <span className="text-xl text-[#E6C2A1]">{action.icon}</span>
              {sidebarOpen && <span>{action.title}</span>}
            </Link>
          ))}

          <button
            onClick={() => navigate("/login")}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#2a2a2a] transition mt-4 w-full
      ${sidebarOpen ? "justify-start" : "justify-center"}`}
          >
            <FiLogOut className="text-xl text-[#E6C2A1]" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } p-6`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 text-[#E6C2A1]">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 max-w-2xl mb-8">
          Manage orders, track performance, upload galleries, and control
          everything related to Inekas Photography.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col justify-between hover:scale-105 transition transform shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <h3 className="text-2xl font-bold text-[#E6C2A1] mt-1">
                    {item.value}
                  </h3>
                </div>
                <div className="text-3xl text-[#E6C2A1] opacity-80">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-[#E6C2A1] mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col items-start hover:border-[#E6C2A1] hover:bg-[#1f1f1f] transition transform hover:scale-105 shadow-lg"
              >
                <span className="text-3xl text-[#E6C2A1] mb-4">
                  {action.icon}
                </span>
                <h3 className="text-lg font-semibold text-gray-200">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Click to manage</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
