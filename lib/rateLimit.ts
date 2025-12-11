/**
 * Rate Limiter sử dụng Supabase để lưu trữ
 * Hỗ trợ limit theo IP và Email
 */

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { headers } from "next/headers";

interface RateLimitConfig {
  windowMs: number; // Thời gian window (ms)
  maxRequests: number; // Số request tối đa trong window
  keyPrefix: string; // Prefix để phân biệt các endpoint
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfter?: number; // seconds
}

/**
 * Lấy IP của client
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  // Vercel/Cloudflare headers
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return "unknown";
}

/**
 * Kiểm tra rate limit
 * Sử dụng sliding window algorithm
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - config.windowMs;
  const fullKey = `${config.keyPrefix}:${key}`;

  try {
    // Xóa các entries cũ
    await supabaseAdmin
      .from("rate_limits")
      .delete()
      .eq("key", fullKey)
      .lt("created_at", new Date(windowStart).toISOString());

    // Đếm số request trong window
    const { count, error } = await supabaseAdmin
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("key", fullKey)
      .gte("created_at", new Date(windowStart).toISOString());

    if (error) {
      console.error("Rate limit check error:", error);
      // Fail open - cho phép request nếu có lỗi
      return {
        allowed: true,
        remaining: config.maxRequests,
        resetAt: new Date(now + config.windowMs),
      };
    }

    const currentCount = count || 0;
    const remaining = Math.max(0, config.maxRequests - currentCount);

    if (currentCount >= config.maxRequests) {
      // Tìm request cũ nhất để tính retry time
      const { data: oldest } = await supabaseAdmin
        .from("rate_limits")
        .select("created_at")
        .eq("key", fullKey)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      const oldestTime = oldest ? new Date(oldest.created_at).getTime() : now;
      const resetAt = new Date(oldestTime + config.windowMs);
      const retryAfter = Math.ceil((resetAt.getTime() - now) / 1000);

      return {
        allowed: false,
        remaining: 0,
        resetAt,
        retryAfter: Math.max(1, retryAfter),
      };
    }

    // Thêm request mới
    await supabaseAdmin.from("rate_limits").insert({
      key: fullKey,
      created_at: new Date().toISOString(),
    });

    return {
      allowed: true,
      remaining: remaining - 1,
      resetAt: new Date(now + config.windowMs),
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetAt: new Date(now + config.windowMs),
    };
  }
}

/**
 * Rate limit configs cho các endpoint
 */
export const RATE_LIMITS = {
  // OTP Send: 3 requests per email per 10 minutes, 10 per IP per 10 minutes
  OTP_SEND_EMAIL: {
    windowMs: 10 * 60 * 1000, // 10 phút
    maxRequests: 3,
    keyPrefix: "otp_send_email",
  },
  OTP_SEND_IP: {
    windowMs: 10 * 60 * 1000, // 10 phút
    maxRequests: 10,
    keyPrefix: "otp_send_ip",
  },
  // OTP Send: Daily limit per email
  OTP_SEND_DAILY: {
    windowMs: 24 * 60 * 60 * 1000, // 24 giờ
    maxRequests: 10, // Max 10 OTP per email per day
    keyPrefix: "otp_daily",
  },

  // OTP Verify: 10 requests per IP per 5 minutes
  OTP_VERIFY_IP: {
    windowMs: 5 * 60 * 1000, // 5 phút
    maxRequests: 10,
    keyPrefix: "otp_verify_ip",
  },

  // Check User: 30 requests per IP per minute
  CHECK_USER_IP: {
    windowMs: 60 * 1000, // 1 phút
    maxRequests: 30,
    keyPrefix: "check_user_ip",
  },

  // Save User: 5 requests per IP per 10 minutes
  SAVE_USER_IP: {
    windowMs: 10 * 60 * 1000, // 10 phút
    maxRequests: 5,
    keyPrefix: "save_user_ip",
  },

  // Job Apply: 20 applications per user per hour
  JOB_APPLY: {
    windowMs: 60 * 60 * 1000, // 1 giờ
    maxRequests: 20,
    keyPrefix: "job_apply",
  },
};

/**
 * Helper function để tạo response rate limit exceeded
 */
export function rateLimitExceededResponse(result: RateLimitResult) {
  return new Response(
    JSON.stringify({
      error: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfter || 60),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": result.resetAt.toISOString(),
      },
    }
  );
}
