"use client";

import { useState, useEffect } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import React from "react";

export default function AdminDashboard() {
  useAuthRedirect("Administrator");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const [sideContent, setSideContent] = useState<any[]>([]);
  const [sideContentLoading, setSideContentLoading] = useState(true);
  const [sideContentError, setSideContentError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchContent() {
      setSideContentLoading(true);
      setSideContentError("");
      try {
        const res = await fetch("/api/admin/fetchSideContent");
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setSideContent(data);
      } catch (err) {
        setSideContentError("Failed to load content");
      } finally {
        setSideContentLoading(false);
      }
    }
    fetchContent();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Dashboard (overview)");

  const categories = [
    "Dashboard (overview)",
    "User Config",
    "Payment Config",
    "Security",
    "Privacy",
    "Legal",
  ];

  // Open edit modal and populate form
  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditForm({
      user_id: user.user_id || user.id || "",
      title: user.title || "",
      email: user.email || "",
      first_name: user.first_name || user.fname || "",
      middle_name: user.middle_name || user.mname || "",
      last_name: user.last_name || user.lname || "",
      date_of_birth: user.date_of_birth || "",
      gender: user.gender || "",
      phone: user.phone || "",
      organization: user.organization || "",
      designation: user.designation || "",
      philosophy: user.philosophy || "",
    });
    setEditModalOpen(true);
  };

  // Open delete dialog
  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // Handle edit form change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Submit edit
  const submitEdit = async () => {
    setActionLoading(true);
    setActionError("");
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update user");
      setEditModalOpen(false);
      setSelectedUser(null);
      // Refresh users
      const refreshed = await fetch("/api/admin");
      setUsers(await refreshed.json());
    } catch (err) {
      setActionError("Failed to update user");
    } finally {
      setActionLoading(false);
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    setActionLoading(true);
    setActionError("");
    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: selectedUser.id }),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      // Refresh users
      const refreshed = await fetch("/api/admin");
      setUsers(await refreshed.json());
    } catch (err) {
      setActionError("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  // Helper to get content for the selected tab
  const getTabContent = () => {
    // Map tab names to slugs in page_content
    const tabSlugMap: Record<string, string> = {
      "Dashboard (overview)": "dashboard",
      "Payment Config": "payment-config",
      "Security": "security",
      "Privacy": "privacy",
      "Legal": "legal",
    };
    const slug = tabSlugMap[selectedCategory];
    if (!slug) return null;
    const row = sideContent.find((c: any) => c.slug === slug);
    return row ? row.content_body : null;
  };

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
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading users...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : (
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
                  {users.map((user: any, idx: number) => (
                    <tr key={user.id || user.email || idx} className="hover:bg-purple-50">
                      <td className="py-2 px-4">{user.fname || user.first_name || ""}</td>
                      <td className="py-2 px-4">{user.mname || user.middle_name || ""}</td>
                      <td className="py-2 px-4">{user.lname || user.last_name || ""}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 text-center flex gap-2 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" onClick={() => handleEdit(user)}>
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={() => handleDelete(user)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Placeholder for other categories */}
        {selectedCategory !== "User Config" && (
          <div className="text-gray-600 text-lg">
            {sideContentLoading ? (
              <div className="text-gray-500">Loading content...</div>
            ) : sideContentError ? (
              <div className="text-red-500">{sideContentError}</div>
            ) : (
              <div>{getTabContent() || <span>No content found for <span className="font-semibold">{selectedCategory}</span>.</span>}</div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[320px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="flex flex-col gap-3">
              <input name="user_id" value={editForm.user_id} readOnly className="border p-2 rounded bg-gray-100" placeholder="User ID (readonly)" />
              <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" className="border p-2 rounded" />
              <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" className="border p-2 rounded" />
              <input name="first_name" value={editForm.first_name} onChange={handleEditChange} placeholder="First Name" className="border p-2 rounded" />
              <input name="middle_name" value={editForm.middle_name} onChange={handleEditChange} placeholder="Middle Name" className="border p-2 rounded" />
              <input name="last_name" value={editForm.last_name} onChange={handleEditChange} placeholder="Last Name" className="border p-2 rounded" />
              <input name="date_of_birth" type="date" value={editForm.date_of_birth} onChange={handleEditChange} placeholder="Date of Birth" className="border p-2 rounded" />
              <input name="gender" value={editForm.gender} onChange={handleEditChange} placeholder="Gender" className="border p-2 rounded" />
              <input name="phone" value={editForm.phone} onChange={handleEditChange} placeholder="Phone" className="border p-2 rounded" />
              <input name="organization" value={editForm.organization} onChange={handleEditChange} placeholder="Organization" className="border p-2 rounded" />
              <input name="designation" value={editForm.designation} onChange={handleEditChange} placeholder="Designation" className="border p-2 rounded" />
              <input name="philosophy" value={editForm.philosophy} onChange={handleEditChange} placeholder="Philosophy" className="border p-2 rounded" />
            </div>
            {actionError && <div className="text-red-500 mt-2">{actionError}</div>}
            <div className="flex gap-2 mt-4 justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditModalOpen(false)} disabled={actionLoading}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitEdit} disabled={actionLoading}>{actionLoading ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[320px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Delete User</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{selectedUser?.email}</span>?</p>
            {actionError && <div className="text-red-500 mt-2">{actionError}</div>}
            <div className="flex gap-2 mt-4 justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setDeleteDialogOpen(false)} disabled={actionLoading}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete} disabled={actionLoading}>{actionLoading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}