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
    // RATE LIMIT: Per IP (30 requests per minute)
    const clientIP = await getClientIP();
    const ipLimit = await checkRateLimit(clientIP, RATE_LIMITS.CHECK_USER_IP);
    if (!ipLimit.allowed) {
      return rateLimitExceededResponse(ipLimit);
    }

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

    // SECURITY: Chỉ trả về userType nếu có requestedType để so sánh
    // Không expose thông tin chi tiết cho unauthenticated requests
    let actualUserType: string | null = null;
    if (requestedType) {
      // Chỉ xác nhận nếu user đúng với type được yêu cầu
      if (requestedType === "candidate" && candidate) {
        actualUserType = "candidate";
      } else if (requestedType === "agency" && agency) {
        actualUserType = "agency";
      }
    }

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
