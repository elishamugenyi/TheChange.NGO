"use client";

import { useState } from "react";

const mockUsers = [
  { id: 1, fname: "John", mname: "A.", lname: "Doe", email: "john@example.com" },
  { id: 2, fname: "Jane", mname: "B.", lname: "Smith", email: "jane@example.com" },
  { id: 3, fname: "Alice", mname: "C.", lname: "Johnson", email: "alice@example.com" },
];

type User = typeof mockUsers[number];

type EditForm = {
  fname: string;
  mname: string;
  lname: string;
};

const sidebarItems = [
  { label: "Dashboard (overview)" },
  { label: "User Config" },
  { label: "Payment Config" },
  { label: "Security" },
  { label: "Privacy" },
  { label: "Legal" },
  { label: "Pages" },
  { label: "Statstics" },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ fname: "", mname: "", lname: "" });

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm({ fname: user.fname, mname: user.mname, lname: user.lname });
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
    closeEditModal();
  };

  return (
    <div className="min-h-screen flex font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside className="w-56 bg-purple-900 text-white flex flex-col">
        <div className="bg-sky-200 text-black text-xl font-medium py-3 text-center">ADMIN</div>
        <nav className="flex-1 flex flex-col gap-2 mt-4 px-2">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className="py-1 px-2 text-lg hover:bg-purple-800 rounded cursor-pointer text-center">
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-900">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-purple-900 text-white">
                <th className="py-3 px-4 text-left">First Name</th>
                <th className="py-3 px-4 text-left">Middle Name</th>
                <th className="py-3 px-4 text-left">Last Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-purple-50">
                  <td className="py-2 px-4">{user.fname}</td>
                  <td className="py-2 px-4">{user.mname}</td>
                  <td className="py-2 px-4">{user.lname}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow text-sm transition-all"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={closeEditModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-purple-900">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    name="fname"
                    value={editForm.fname}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    name="mname"
                    value={editForm.mname}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    name="lname"
                    value={editForm.lname}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
