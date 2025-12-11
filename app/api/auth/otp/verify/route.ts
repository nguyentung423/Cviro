import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  checkRateLimit,
  getClientIP,
  RATE_LIMITS,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (
      !email ||
      typeof email !== "string" ||
      !code ||
      typeof code !== "string"
    ) {
      return NextResponse.json(
        { error: "Email và mã là bắt buộc" },
        { status: 400 }
      );
    }

    // RATE LIMIT: Per IP (10 requests per 5 minutes)
    const clientIP = await getClientIP();
    const ipLimit = await checkRateLimit(clientIP, RATE_LIMITS.OTP_VERIFY_IP);
    if (!ipLimit.allowed) {
      return rateLimitExceededResponse(ipLimit);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const now = Date.now();

    const { data: otp, error: fetchErr } = await supabaseAdmin
      .from("otps")
      .select("code, expires_at, attempts")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (fetchErr) {
      console.error("otp fetch error", fetchErr);
      return NextResponse.json({ error: "Xác thực thất bại" }, { status: 500 });
    }

    if (!otp) {
      return NextResponse.json(
        { error: "Không tìm thấy mã. Vui lòng yêu cầu mã mới." },
        { status: 400 }
      );
    }

    const expiresAt = new Date(otp.expires_at as string).getTime();
    if (now > expiresAt) {
      await supabaseAdmin.from("otps").delete().eq("email", normalizedEmail);
      return NextResponse.json(
        { error: "Mã đã hết hạn. Vui lòng yêu cầu mã mới." },
        { status: 400 }
      );
    }

    if (otp.attempts >= MAX_ATTEMPTS) {
      await supabaseAdmin.from("otps").delete().eq("email", normalizedEmail);
      return NextResponse.json(
        { error: "Quá số lần thử. Vui lòng yêu cầu mã mới." },
        { status: 400 }
      );
    }

    const isMatch = otp.code === code.trim();

    if (isMatch) {
      // Lưu verification record để save-user có thể verify
      await supabaseAdmin.from("verified_emails").upsert(
        {
          email: normalizedEmail,
          verified_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 phút
        },
        { onConflict: "email" }
      );

      await supabaseAdmin.from("otps").delete().eq("email", normalizedEmail);
      return NextResponse.json({ ok: true });
    }

    const nextAttempts = (otp.attempts || 0) + 1;
    await supabaseAdmin
      .from("otps")
      .update({ attempts: nextAttempts })
      .eq("email", normalizedEmail);

    return NextResponse.json(
      {
        ok: false,
        error: "Mã không chính xác",
        attemptsLeft: Math.max(0, MAX_ATTEMPTS - nextAttempts),
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("verify otp error", error);
    return NextResponse.json({ error: "Xác thực thất bại" }, { status: 500 });
  }
}
