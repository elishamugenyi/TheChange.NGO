"use client";

import { useState } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function AdminDashboard() {
  useAuthRedirect("Administrator");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState([
    { id: 1, fname: "John", mname: "A.", lname: "Doe", email: "john@example.com" },
    { id: 2, fname: "Jane", mname: "B.", lname: "Smith", email: "jane@example.com" },
    { id: 3, fname: "Alice", mname: "C.", lname: "Johnson", email: "alice@example.com" },
    { id: 4, fname: "Bob", mname: "D.", lname: "Williams", email: "bob@example.com" },
    { id: 5, fname: "Charlie", mname: "E.", lname: "Brown", email: "charlie@example.com" },
    { id: 6, fname: "David", mname: "F.", lname: "Wilson", email: "david@example.com" },
    { id: 7, fname: "Eva", mname: "G.", lname: "Taylor", email: "eva@example.com" },
    { id: 8, fname: "Frank", mname: "H.", lname: "Anderson", email: "frank@example.com" },
    { id: 9, fname: "Grace", mname: "I.", lname: "Thomas", email: "grace@example.com" },
    { id: 10, fname: "Hannah", mname: "J.", lname: "Jackson", email: "hannah@example.com" },
    { id: 11, fname: "Isaac", mname: "K.", lname: "White", email: "isaac@example.com" },
    { id: 12, fname: "Jack", mname: "L.", lname: "Harris", email: "jack@example.com" },
    { id: 13, fname: "Karen", mname: "M.", lname: "Martin", email: "karen@example.com" },
    { id: 14, fname: "Liam", mname: "N.", lname: "Thompson", email: "liam@example.com" },
    { id: 15, fname: "Mia", mname: "O.", lname: "Garcia", email: "mia@example.com" },
    { id: 16, fname: "Noah", mname: "P.", lname: "Martinez", email: "noah@example.com" },
    { id: 17, fname: "Olivia", mname: "Q.", lname: "Robinson", email: "olivia@example.com" },
    { id: 18, fname: "Paul", mname: "R.", lname: "Clark", email: "paul@example.com" },
    { id: 19, fname: "Quincy", mname: "S.", lname: "Rodriguez", email: "quincy@example.com" },
    { id: 20, fname: "Rachel", mname: "T.", lname: "Lewis", email: "rachel@example.com" },
    { id: 21, fname: "Steve", mname: "U.", lname: "Lee", email: "steve@example.com" },
    { id: 22, fname: "Tina", mname: "V.", lname: "Walker", email: "tina@example.com" },
    { id: 23, fname: "Uma", mname: "W.", lname: "Hall", email: "uma@example.com" },
    { id: 24, fname: "Victor", mname: "X.", lname: "Allen", email: "victor@example.com" },
    { id: 25, fname: "Wendy", mname: "Y.", lname: "Young", email: "wendy@example.com" },
    { id: 26, fname: "Xander", mname: "Z.", lname: "Hernandez", email: "xander@example.com" },
    { id: 27, fname: "Yara", mname: "A1.", lname: "King", email: "yara@example.com" },
    { id: 28, fname: "Zoe", mname: "B1.", lname: "Wright", email: "zoe@example.com" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Dashboard (overview)");

  const categories = [
    "Dashboard (overview)",
    "User Config",
    "Payment Config",
    "Security",
    "Privacy",
    "Legal",
  ];

  return (
    <div className="flex min-h-[80vh] p-4 mt-4 font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar with Categories - fill vertical height */}
      <aside className="w-56 bg-purple-900 text-white p-4 flex flex-col gap-2 rounded-lg min-h-auto">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            // Conditionally add 'mt-4' if it's the first item (idx === 0)
            className={`${idx === 0 ? "mt-4" : ""} py-2 px-3 text-left rounded ${selectedCategory === cat ? "bg-purple-700 font-bold" : "hover:bg-purple-800"
              } transition-all`}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-50 ml-4 rounded-lg">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">{selectedCategory}</h1>

        {/* User Management Section */}
        {selectedCategory === "User Config" && (
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full bg-white rounded shadow">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">First Name</th>
                  <th className="py-2 px-4 text-left">Middle Name</th>
                  <th className="py-2 px-4 text-left">Last Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-purple-50">
                    <td className="py-2 px-4">{user.fname}</td>
                    <td className="py-2 px-4">{user.mname}</td>
                    <td className="py-2 px-4">{user.lname}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4 text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Placeholder for other categories */}
        {selectedCategory !== "User Config" && (
          <div className="text-gray-600 text-lg">
            Content for <span className="font-semibold">{selectedCategory}</span> will go here.
          </div>
        )}
      </div>
    </div>
  );
}