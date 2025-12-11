import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  checkRateLimit,
  getClientIP,
  RATE_LIMITS,
  rateLimitExceededResponse,
} from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const TTL_MS = 5 * 60 * 1000; // 5 minutes
const COOLDOWN_MS = 30 * 1000; // 30 seconds

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const clientIP = await getClientIP();

    // RATE LIMIT 1: Per IP (10 requests per 10 minutes)
    const ipLimit = await checkRateLimit(clientIP, RATE_LIMITS.OTP_SEND_IP);
    if (!ipLimit.allowed) {
      return rateLimitExceededResponse(ipLimit);
    }

    // RATE LIMIT 2: Per Email (3 requests per 10 minutes)
    const emailLimit = await checkRateLimit(
      normalizedEmail,
      RATE_LIMITS.OTP_SEND_EMAIL
    );
    if (!emailLimit.allowed) {
      return rateLimitExceededResponse(emailLimit);
    }

    // RATE LIMIT 3: Daily limit per email (10 per day)
    const dailyLimit = await checkRateLimit(
      normalizedEmail,
      RATE_LIMITS.OTP_SEND_DAILY
    );
    if (!dailyLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Bạn đã đạt giới hạn OTP trong ngày. Vui lòng thử lại sau 24 giờ.",
        },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY missing" },
        { status: 500 }
      );
    }

    const now = Date.now();

    // Check cooldown
    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from("otps")
      .select("created_at, expires_at")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (fetchErr) {
      console.error("otp fetch error", fetchErr);
      return NextResponse.json({ error: "Failed to process" }, { status: 500 });
    }

    if (existing) {
      const createdAt = new Date(existing.created_at as string).getTime();
      if (now - createdAt < COOLDOWN_MS) {
        return NextResponse.json(
          { error: "Vui lòng đợi trước khi gửi lại mã" },
          { status: 429 }
        );
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(now + TTL_MS).toISOString();

    const { error: upsertErr } = await supabaseAdmin.from("otps").upsert(
      {
        email: normalizedEmail,
        code,
        expires_at: expiresAt,
        attempts: 0,
        created_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (upsertErr) {
      console.error("otp upsert error", upsertErr);
      return NextResponse.json(
        { error: "Failed to store code" },
        { status: 500 }
      );
    }

    const emailResult = await resend.emails.send({
      from: "Cviro <no-reply@cviro.online>",
      to: normalizedEmail,
      subject: "Mã xác thực Cviro",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Mã xác thực của bạn</h2>
          <p style="font-size: 16px; color: #666;">Mã OTP có hiệu lực trong 5 phút:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #ab3f20; font-size: 36px; margin: 0; letter-spacing: 8px;">${code}</h1>
          </div>
          <p style="font-size: 14px; color: #999;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">Cviro - Nền tảng tuyển dụng</p>
        </div>
      `,
      text: `Mã xác thực Cviro của bạn là: ${code}\n\nMã có hiệu lực trong 5 phút.\n\nNếu bạn không yêu cầu mã này, vui lòng bỏ qua email.`,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("send otp error", error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
