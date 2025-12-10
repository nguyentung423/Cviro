import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("candidates")
      .select("*")
      .eq("email", session.user.email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Get profile error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      age,
      height,
      weight,
      phone,
      zalo,
      experience,
      avatar_url,
      photo_1,
      photo_2,
      photo_3,
      photo_4,
    } = body;

    const email = session.user.email.trim().toLowerCase();

    // Try to update first
    const { data: updateData, error: updateError } = await supabaseAdmin
      .from("candidates")
      .update({
        name,
        age,
        height,
        weight,
        phone,
        zalo,
        experience,
        avatar_url,
        photo_1,
        photo_2,
        photo_3,
        photo_4,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email)
      .select()
      .maybeSingle();

    // If update failed because record doesn't exist, create it
    if (updateError?.code === "PGRST116" || !updateData) {
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from("candidates")
        .insert({
          email,
          name,
          age,
          height,
          weight,
          phone,
          zalo,
          experience,
          avatar_url,
          photo_1,
          photo_2,
          photo_3,
          photo_4,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert profile error:", insertError);
        return NextResponse.json(
          { error: "Failed to create profile" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, profile: insertData });
    }

    if (updateError) {
      console.error("Update profile error:", updateError);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: updateData });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
