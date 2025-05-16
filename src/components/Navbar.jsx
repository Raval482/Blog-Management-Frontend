import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    if (token) {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 shadow-[0_4px_20px_rgba(80,0,220,0.3)] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">HoGrowth</h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 text-lg font-medium">
            <Link
              to="/admin/dashboard"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/admin/blog"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
            >
              Blog
            </Link>
            {/* <Link
              to="/admin/request"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
            >
              Pending Request
            </Link> */}
            <Link
              to="/admin/createblog"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
            >
              Create Blog
            </Link>
          </div>

          {/* Logout */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={logout}
              className="bg-white/20 text-white font-medium px-5 py-2 rounded-xl border border-white/30 shadow-md hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              Logout
            </button>
            <Link to="/admin/changePassword"
              className="bg-white/20 text-white font-medium px-5 py-2 rounded-xl border border-white/30 shadow-md hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              Change Password
            </Link>
          </div>

          {/* Mobile icon placeholder */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
