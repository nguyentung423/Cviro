import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get candidate
    const { data: candidate } = await supabaseAdmin
      .from("candidates")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // Get notifications
    const { data: notifications, error } = await supabaseAdmin
      .from("notifications")
      .select(
        `
        *,
        application:applications (
          id,
          job:jobs (
            id,
            title,
            location,
            agency:agencies (
              phone,
              agency_name
            )
          )
        )
      `
      )
      .eq("candidate_id", candidate.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Get notifications error:", error);
      return NextResponse.json(
        { error: "Failed to get notifications" },
        { status: 500 }
      );
    }

    return NextResponse.json(notifications || []);
  } catch (error) {
    console.error("Get notifications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
