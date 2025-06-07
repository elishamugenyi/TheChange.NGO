"use client";
import React from "react";

export interface SidebarItem {
    label: string;
    slug: string;
    path: string;
}

export function AdminSidebar({
    items,
    selected,
    onSelect,
}: {
    items: SidebarItem[];
    selected: string;
    onSelect: (slug: string) => void;
}) {
    return (
        <aside className="w-56 bg-purple-900 text-white p-4 flex flex-col gap-2 rounded">
            {items.map((item) => (
                <button
                    key={item.slug}
                    onClick={() => onSelect(item.slug)}
                    className={`py-2 px-3 text-left rounded transition-all ${selected === item.slug ? "bg-purple-700 font-bold" : "hover:bg-purple-800"
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </aside>
    );
}
