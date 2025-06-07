"use client";
import React from "react";

export interface User {
    id: string;
    fname?: string;
    mname?: string;
    lname?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email: string;
}

export function UserTable({ users, onEdit, onDelete }: {
    users: User[];
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
}) {
    return (
        <div className="overflow-auto max-h-[600px]">
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
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-purple-50">
                            <td className="py-2 px-4">{u.fname || u.first_name}</td>
                            <td className="py-2 px-4">{u.mname || u.middle_name}</td>
                            <td className="py-2 px-4">{u.lname || u.last_name}</td>
                            <td className="py-2 px-4">{u.email}</td>
                            <td className="py-2 px-4 flex gap-2 justify-center">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                    onClick={() => onEdit(u)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    onClick={() => onDelete(u)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

