import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  checkRateLimit,
  getClientIP,
  RATE_LIMITS,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    // RATE LIMIT: Per IP (5 requests per 10 minutes)
    const clientIP = await getClientIP();
    const ipLimit = await checkRateLimit(clientIP, RATE_LIMITS.SAVE_USER_IP);
    if (!ipLimit.allowed) {
      return rateLimitExceededResponse(ipLimit);
    }

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

    // SECURITY: Kiểm tra email đã được verify qua OTP chưa
    const { data: verification } = await supabaseAdmin
      .from("verified_emails")
      .select("verified_at")
      .eq("email", normalizedEmail)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (!verification) {
      return NextResponse.json(
        {
          error:
            "Email chưa được xác thực. Vui lòng hoàn thành xác thực OTP trước.",
        },
        { status: 403 }
      );
    }

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

    // Xóa verification record sau khi tạo user thành công
    await supabaseAdmin
      .from("verified_emails")
      .delete()
      .eq("email", normalizedEmail);

    return NextResponse.json({ ok: true, alreadyExists: false });
  } catch (error) {
    console.error("Save user error:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
