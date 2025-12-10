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
      subject: "🎯 Mã xác thực tài khoản Cviro - Hoàn tất đăng ký ngay!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ab3f20 0%, #8b2f15 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Chào mừng đến với Cviro! 👋
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <!-- Introduction -->
              <div style="margin-bottom: 28px;">
                <h2 style="margin: 0 0 12px 0; color: #111827; font-size: 20px; font-weight: 600;">
                  Chúng tôi là ai?
                </h2>
                <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                  <strong>Cviro</strong> là nền tảng kết nối <strong style="color: #ab3f20;">ứng viên và nhà tuyển dụng</strong> nhanh chóng, minh bạch và hiệu quả. Chúng tôi giúp bạn:
                </p>
              </div>

              <!-- Benefits -->
              <div style="background-color: #fef2f2; border-left: 4px solid #ab3f20; padding: 16px 20px; margin-bottom: 28px; border-radius: 6px;">
                <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                  <li><strong>Ứng viên:</strong> Tìm việc nhanh chóng với hồ sơ trực tuyến, nhận thông báo việc làm phù hợp</li>
                  <li><strong>Nhà tuyển dụng:</strong> Đăng tin tuyển dụng, quản lý ứng viên dễ dàng, tiết kiệm thời gian</li>
                  <li><strong>Miễn phí 100%:</strong> Không tính phí ẩn, minh bạch từ A-Z</li>
                </ul>
              </div>

              <!-- OTP Code -->
              <div style="margin-bottom: 28px;">
                <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 18px; font-weight: 600;">
                  Mã xác thực của bạn:
                </h3>
                <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px dashed #ab3f20; padding: 24px; border-radius: 10px; text-align: center; margin: 16px 0;">
                  <div style="font-size: 40px; font-weight: 800; letter-spacing: 12px; color: #ab3f20; font-family: 'Courier New', monospace; text-shadow: 2px 2px 4px rgba(171, 63, 32, 0.1);">
                    ${code}
                  </div>
                </div>
                <p style="margin: 12px 0 0 0; color: #dc2626; font-size: 14px; text-align: center; font-weight: 500;">
                  ⏱️ Mã có hiệu lực trong <strong>5 phút</strong>
                </p>
              </div>

              <!-- Instructions -->
              <div style="background-color: #f3f4f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                  <strong>📝 Hướng dẫn:</strong><br>
                  1. Quay lại trang đăng ký Cviro<br>
                  2. Nhập mã <strong>${code}</strong> vào ô xác thực<br>
                  3. Hoàn tất và bắt đầu sử dụng ngay!
                </p>
              </div>

              <!-- Security Notice -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                  🔒 <strong>Bảo mật:</strong> Không chia sẻ mã này với bất kỳ ai. Cviro không bao giờ yêu cầu mã qua điện thoại hoặc tin nhắn.
                </p>
                <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                  ℹ️ Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email hoặc liên hệ hỗ trợ.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                Trân trọng,<br>
                <strong style="color: #ab3f20;">Đội ngũ Cviro</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                © 2025 Cviro. Nền tảng tuyển dụng hiện đại.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `Chào mừng đến với Cviro!

CHÚNG TÔI LÀ AI?
Cviro là nền tảng kết nối ứng viên và nhà tuyển dụng nhanh chóng, minh bạch và hiệu quả.

LỢI ÍCH BẠN NHẬN:
• Ứng viên: Tìm việc nhanh với hồ sơ trực tuyến, nhận thông báo việc làm phù hợp
• Nhà tuyển dụng: Đăng tin tuyển dụng, quản lý ứng viên dễ dàng
• Miễn phí 100%: Không tính phí ẩn, minh bạch từ A-Z

MÃ XÁC THỰC CỦA BẠN: ${code}

Mã có hiệu lực trong 5 phút.

HƯỚNG DẪN:
1. Quay lại trang đăng ký Cviro
2. Nhập mã ${code} vào ô xác thực
3. Hoàn tất và bắt đầu sử dụng!

BẢO MẬT: Không chia sẻ mã này với bất kỳ ai.

Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ Cviro`,
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
