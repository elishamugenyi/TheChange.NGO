export async function fetchUsers() {
    const res = await fetch("/api/admin");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUser(editForm: any) {
    const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
    });
    if (!res.ok) throw new Error("Failed to update user");
}

export async function deleteUser(userId: string) {
    const res = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
    });
    if (!res.ok) throw new Error("Failed to delete user");
}

/**
 * Fetch all sidebar items from DB
 */
export async function fetchSideContent() {
    const res = await fetch("/api/admin/fetchSidebarItems");
    if (!res.ok) throw new Error("Failed to fetch sidebar items");
    return res.json();
}
  

export async function fetchSidebarItems() {
    const res = await fetch("/api/admin/fetchSideContent")
    if (!res.ok) {
        throw new Error("Failed to fetch sidebar items");
    }
    return res.json();
}
  
// export async function fetchSidebarItems() {
//     const res = await fetch("/api/sidebar");
//     if (!res.ok) throw new Error("Failed to fetch sidebar items");
//     return res.json();
//   }