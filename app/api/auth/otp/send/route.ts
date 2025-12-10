import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const TTL_MS = 5 * 60 * 1000; // 5 minutes
const COOLDOWN_MS = 30 * 1000; // 30 seconds

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY missing" },
        { status: 500 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
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
      subject: "Mã xác thực Cviro của bạn",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ab3f20;">Xác thực tài khoản Cviro</h2>
          <p>Mã xác thực của bạn là:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ab3f20;">${code}</span>
          </div>
          <p style="color: #666;">Mã này có hiệu lực trong <strong>5 phút</strong>.</p>
          <p style="color: #999; font-size: 12px;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
        </div>
      `,
      text: `Mã xác thực Cviro của bạn là: ${code}. Mã có hiệu lực trong 5 phút.`,
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
