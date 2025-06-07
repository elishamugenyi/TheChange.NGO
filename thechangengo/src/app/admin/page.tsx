/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useEffect } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  fetchSidebarItems,
} from "@/lib/crud";
import { AdminSidebar } from "@/components/AdminSidebar";
import { UserTable } from "@/components/UserTable";
import { EditUserModal } from "@/components/EditUserModal";
import { DeleteUserDialog } from "@/components/DeleteUserDialog";

export default function AdminDashboard() {
  useAuthRedirect("Administrator");

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [sideItems, setSideItems] = useState<any[]>([]);
  const [sideLoading, setSideLoading] = useState<boolean>(true);
  const [sideError, setSideError] = useState<string>("");

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<string>("dashboard");


  useEffect(() => {
    setSideLoading(true);
    fetchSidebarItems()
      .then((data) => {
        console.log("Fetched sidebar data:", data); // ✅ Add this line
        setSideItems(data);
      })
      .catch((e) => setSideError(e.message))
      .finally(() => setSideLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSideLoading(true);
    fetchSidebarItems()
      .then((data) => setSideItems(data))
      .catch((e) => setSideError(e.message))
      .finally(() => setSideLoading(false));
  }, []);

  const sidebarItems = [
    { label: "Dashboard (overview)", slug: "dashboard", path: "/dashboard" },
    { label: "User Config", slug: "user-config", path: "/user-config" },
    ...sideItems
      .filter(
        (c) =>
          c.slug?.toLowerCase() !== "dashboard" &&
          c.slug?.toLowerCase() !== "user-config"
    )
    .map((c) => ({ label: c.title, slug: c.slug, path: `/${c.slug}` }))
    // .map((c) => ({ label: c.title, slug: c.slug, path: `/${c.slug}` }))


  ];

  const currentLabel =
    sidebarItems.find((i) => i.slug === selectedCategory)?.label || "";

  const getTabContent = () => {
    if (selectedCategory === "dashboard" || selectedCategory === "user-config") return null;
    return (
      sideItems.find((c) => c.slug === selectedCategory)?.content_body || null
    );
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditForm({
      user_id: user.id,
      title: user.title || "",
      email: user.email,
      first_name: user.fname || user.first_name || "",
      middle_name: user.mname || user.middle_name || "",
      last_name: user.lname || user.last_name || "",
      date_of_birth: user.date_of_birth || "",
      gender: user.gender || "",
      phone: user.phone || "",
      organization: user.organization || "",
      designation: user.designation || "",
      philosophy: user.philosophy || "",
    });
    setActionError("");
    setEditModalOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setActionError("");
    setDeleteDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEdit = async () => {
    setActionLoading(true);
    try {
      await updateUser(editForm);
      const refreshed = await fetchUsers();
      setUsers(refreshed);
      setEditModalOpen(false);
    } catch (e: any) {
      setActionError(e.message);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteUser(selectedUser.id);
      const refreshed = await fetchUsers();
      setUsers(refreshed);
      setDeleteDialogOpen(false);
    } catch (e: any) {
      setActionError(e.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        items={sidebarItems}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">{currentLabel}</h1>

        {selectedCategory === "dashboard" && (
          <p>Welcome to the dashboard overview.</p>
        )}

        {selectedCategory === "user-config" && (
          loading ? (
            <div>Loading users...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
          )
        )}

        {selectedCategory !== "dashboard" && selectedCategory !== "user-config" && (
          sideLoading ? (
            <div>Loading content...</div>
          ) : sideError ? (
            <div className="text-red-500">{sideError}</div>
          ) : (
            <div className="text-gray-700">
              {getTabContent() || <p>No content available.</p>}
            </div>
          )
        )}
      </div>

      <EditUserModal
        isOpen={editModalOpen}
        form={editForm}
        onChange={handleChange}
        onCancel={() => setEditModalOpen(false)}
        onSave={submitEdit}
        loading={actionLoading}
        error={actionError}
      />

      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        email={selectedUser?.email}
        onCancel={() => setDeleteDialogOpen(false)}
        onDelete={confirmDelete}
        loading={actionLoading}
        error={actionError}
      />
    </div>
  );
}