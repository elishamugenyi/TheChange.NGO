import { NextResponse } from "next/server";
import { supabase } from "../../../lib/db"; // Adjust path as needed

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("sidebar_items")
            .select("label, path, icon_name, sort_order")
            .order("sort_order", { ascending: true });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to fetch sidebar items" },
                { status: 500 }
            );
        }

        // Return cleaned sidebar item list
        return NextResponse.json(data);
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
