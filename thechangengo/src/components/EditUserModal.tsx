"use client";
import React from "react";

export function EditUserModal({
    isOpen,
    form,
    onChange,
    onCancel,
    onSave,
    loading,
    error,
}: {
    isOpen: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    onSave: () => void;
    loading: boolean;
    error: string;
}) {
    if (!isOpen) return null;
    const fields = [
        "title",
        "email",
        "first_name",
        "middle_name",
        "last_name",
        "date_of_birth",
        "gender",
        "phone",
        "organization",
        "designation",
        "philosophy",
    ];
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <div className="flex flex-col gap-3">
                    <input name="user_id" value={form.user_id} readOnly className="border p-2 rounded bg-gray-100" />
                    {fields.map(f => (
                        <input
                            key={f}
                            name={f}
                            type={f === "date_of_birth" ? "date" : "text"}
                            value={form[f] || ""}
                            onChange={onChange}
                            placeholder={f.replace("_", " ").toUpperCase()}
                            className="border p-2 rounded"
                        />
                    ))}
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="flex gap-2 mt-4 justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

