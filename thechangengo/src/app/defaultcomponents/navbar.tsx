'use client';

// import { ThemeProvider } from "./theme-provider";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaEdit, FaKey, FaTachometerAlt } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";


// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "/components/ui/dropdown-menu"


export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasAdminRole, setHasAdminRole] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  


  // export function ModeToggle() {
  //   const { setTheme } = useTheme()  

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decoded = decodeJwt(token);
        if (decoded && decoded.user_name) {
          setLoggedIn(true);
          setUsername(decoded.user_name);
          const roles = decoded.roles || decoded.role || [];
          const allowedRoles = ["God Mode", "Administrator", "Developer", "Moderator"];
          if (Array.isArray(roles)) {
            setHasAdminRole(roles.some(r => allowedRoles.includes(r)));
          } else {
            setHasAdminRole(allowedRoles.includes(roles));
          }
        }
      } else {
        setLoggedIn(false);
        setUsername(null);
        setHasAdminRole(false);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function decodeJwt(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

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
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>


        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        


        {!loggedIn ? (
          <NavLink href="/login">Login</NavLink>
        ) : (
          <div className="relative ml-4">
            <button
              className="flex items-center text-purple-900 hover:text-purple-700 focus:outline-none"
              onClick={() => setDropdownOpen(open => !open)}
            >
              <FaUserCircle className="text-3xl" />
              <span className="ml-2 font-semibold">{username}</span>
              <FaChevronDown className="text-lg ml-1" />
            </button>

            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-20 border border-gray-200">
                {hasAdminRole && (
                  <Link href="/admin" className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-gray-700">
                    <FaTachometerAlt /> Dashboard
                  </Link>
                )}
                <Link href="/edit-profile" className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-gray-700">
                  <FaEdit /> Edit Profile
                </Link>
                <Link href="/change-password" className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-gray-700">
                  <FaKey /> Change Password
                </Link>
                <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-red-600" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-teal-800 hover:bg-aliceblue-200 transition-colors duration-200">
      {children}
    </Link>
  );
};
;;