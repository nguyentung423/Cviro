import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, name, userType } = await req.json();

    if (!email || !userType) {
      return NextResponse.json(
        { error: "Email and userType are required" },
        { status: 400 }
      );
    }

    if (userType !== "candidate" && userType !== "agency") {
      return NextResponse.json({ error: "Invalid userType" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const tableName = userType === "candidate" ? "candidates" : "agencies";
    const otherTable = userType === "candidate" ? "agencies" : "candidates";

    // Check if email already used for OTHER role
    const { data: existingOtherRole } = await supabaseAdmin
      .from(otherTable)
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingOtherRole) {
      const otherRoleName = userType === "candidate" ? "Agency" : "Candidate";
      return NextResponse.json(
        {
          error: `Email này đã được đăng ký với vai trò ${otherRoleName}. Vui lòng sử dụng email khác hoặc đăng nhập với vai trò tương ứng.`,
        },
        { status: 409 }
      );
    }

    // Check if user already exists in correct table
    const { data: existing } = await supabaseAdmin
      .from(tableName)
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      // User already exists, just return success
      return NextResponse.json({ ok: true, alreadyExists: true });
    }

    // Create new user
    const { error: insertErr } = await supabaseAdmin.from(tableName).insert({
      email: normalizedEmail,
      name: name || null,
      created_at: new Date().toISOString(),
    });

    if (insertErr) {
      console.error("Insert user error:", insertErr);
      return NextResponse.json(
        { error: "Failed to save user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, alreadyExists: false });
  } catch (error) {
    console.error("Save user error:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
