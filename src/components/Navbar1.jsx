import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const Navbar1 = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    if (token) {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-wide">HoGrowth</h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 text-lg font-medium">
            <Link to="/dashboard" className="hover:text-yellow-200 transition duration-300">All Blog</Link>
            <Link to="/blog" className="hover:text-yellow-200 transition duration-300">My Blog</Link>
            <Link to="/create-blog" className="hover:text-yellow-200 transition duration-300">Create Blog</Link>
            <Link to="/purchese-plane" className="hover:text-yellow-200 transition duration-300">Purchese Plane</Link>
            <Link to="/chat" className="hover:text-yellow-200 transition duration-300">Chat</Link>
          </div>

          {/* Profile Dropdown */}
          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
            >
              Profile <FaChevronDown className="text-sm mt-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-14 right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/changePassword"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Change Password
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Icon */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
