'use client';

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaEdit, FaKey } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(!!sessionStorage.getItem("token"));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleProtectedNav = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (sessionStorage.getItem("token")) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-4 shadow-sm">
      <div className="mb-4 sm:mb-0">
        <Image 
          src="/logo.webp" 
          alt="logo" 
          width={120} 
          height={60}
          className="hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 items-center">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        {!loggedIn && <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 shadow-md transition-colors duration-200" onClick={e => handleProtectedNav(e, "donate")}>Donate</a>}
        {!loggedIn && <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 shadow-md transition-colors duration-200" onClick={e => handleProtectedNav(e, "volunteer")}>Volunteer</a>}
        {!loggedIn && <NavLink href="/login">Login</NavLink>}
        {loggedIn && (
          <div className="relative ml-4">
            <button
              className="flex items-center text-purple-900 hover:text-purple-700 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <FaUserCircle className="text-3xl" />
              <FaChevronDown className="text-lg ml-1" />
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-20 border border-gray-200">
                <Link href="/change-password" className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-gray-700"><FaKey /> Change Password</Link>
                <Link href="/edit-profile" className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-gray-700"><FaEdit /> Edit Profile</Link>
                <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-red-600" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable NavLink component for consistent styling
function NavLink({ href, children, accent = false }: { href: string, children: React.ReactNode, accent?: boolean }) {
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${accent ? 
          'bg-teal-600 text-white hover:bg-teal-700 shadow-md' : 
          'text-slate-700 hover:text-teal-800 hover:bg-aliceblue-200'
        }
      `}
    >
      {children}
    </Link>
  );
}