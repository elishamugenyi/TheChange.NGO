"use client";
import React from "react";

export function DeleteUserDialog({
    isOpen,
    email,
    onCancel,
    onDelete,
    loading,
    error,
}: {
    isOpen: boolean;
    email: string;
    onCancel: () => void;
    onDelete: () => void;
    loading: boolean;
    error: string;
}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Delete User</h2>
                <p>Are you sure you want to delete <span className="font-semibold">{email}</span>?</p>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="flex gap-2 mt-4 justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

