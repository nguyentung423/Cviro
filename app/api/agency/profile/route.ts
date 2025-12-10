import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: agency, error } = await supabaseAdmin
      .from("agencies")
      .select("*")
      .eq("email", session.user.email)
      .maybeSingle();

    if (error || !agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    return NextResponse.json(agency);
  } catch (error) {
    console.error("Get agency profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { agency_name, phone, bio, avatar_url } = body;

    const updateData: Record<string, string | null> = {};
    if (agency_name !== undefined) updateData.agency_name = agency_name;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

    const { data: agency, error } = await supabaseAdmin
      .from("agencies")
      .update(updateData)
      .eq("email", session.user.email)
      .select()
      .single();

    if (error) {
      console.error("Update agency profile error:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(agency);
  } catch (error) {
    console.error("Update agency profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
