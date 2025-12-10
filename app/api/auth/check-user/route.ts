import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, userType: requestedType } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();

    // Check both tables
    const { data: candidate } = await supabaseAdmin
      .from("candidates")
      .select("id")
      .eq("email", emailLower)
      .maybeSingle();

    const { data: agency } = await supabaseAdmin
      .from("agencies")
      .select("id")
      .eq("email", emailLower)
      .maybeSingle();

    const exists = !!(candidate || agency);
    const actualUserType = candidate ? "candidate" : agency ? "agency" : null;

    return NextResponse.json(
      { exists, userType: actualUserType },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Check user error:", error);
    return NextResponse.json({ exists: false, userType: null });
  }
}
