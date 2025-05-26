"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaEdit, FaKey } from "react-icons/fa";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useAuthRedirect();

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

  // Volunteer form state
  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  // Donate form state
  const [donate, setDonate] = useState({
    amount: "",
    method: "",
    message: "",
  });

  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleDonateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDonate({ ...donate, [e.target.name]: e.target.value });
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle volunteer form submission
    alert("Thank you for volunteering!");
    setVolunteer({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donate form submission
    alert("Thank you for your donation!");
    setDonate({ amount: "", method: "", message: "" });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 px-4 flex flex-col items-center">
        {/* Top right visible Logout button */}
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow transition-all"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
        {/* Forms Section */}
        <div className="w-full max-w-4xl grid grid-cols-1 mt-20 md:grid-cols-2 gap-8">
          {/* Volunteer Form */}
          <form onSubmit={handleVolunteerSubmit} className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Volunteer With Us</h2>
            <input
              name="name"
              value={volunteer.name}
              onChange={handleVolunteerChange}
              placeholder="Full Name"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <input
              name="email"
              type="email"
              value={volunteer.email}
              onChange={handleVolunteerChange}
              placeholder="Email"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <input
              name="phone"
              value={volunteer.phone}
              onChange={handleVolunteerChange}
              placeholder="Phone Number"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <input
              name="interest"
              value={volunteer.interest}
              onChange={handleVolunteerChange}
              placeholder="Area of Interest"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <textarea
              name="message"
              value={volunteer.message}
              onChange={handleVolunteerChange}
              placeholder="Why do you want to volunteer? (optional)"
              rows={3}
              className="border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 mt-2"
            >
              Submit
            </button>
          </form>

          {/* Donate Form */}
          <form onSubmit={handleDonateSubmit} className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Donate</h2>
            <input
              name="amount"
              type="number"
              min="1"
              value={donate.amount}
              onChange={handleDonateChange}
              placeholder="Amount (USD)"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              name="method"
              value={donate.method}
              onChange={handleDonateChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
            <textarea
              name="message"
              value={donate.message}
              onChange={handleDonateChange}
              placeholder="Message (optional)"
              rows={3}
              className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 mt-2"
            >
              Donate
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
