"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail, Shield } from "lucide-react";

function VerifyOtpContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "candidate"; // candidate or agency

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [resending, setResending] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const hasSentOtp = useRef(false);

  const email = session?.user?.email;

  // Auto-send OTP on mount
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login/${userType}`);
      return;
    }

    if (email && sendStatus === "idle" && !hasSentOtp.current) {
      hasSentOtp.current = true;
      setSendStatus("sending");
      sendOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, status, userType, router]);

  const sendOtp = async () => {
    if (!email) return;

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSendStatus("sent");
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "Không thể gửi mã");
        setSendStatus("error");
      }
    } catch (err) {
      console.error("send otp error", err);
      setError("Lỗi kết nối. Vui lòng thử lại.");
      setSendStatus("error");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Verify OTP
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: code.trim() }),
      });

      const data = await res.json();

      if (data.ok) {
        // Step 2: Save user to Supabase
        const saveRes = await fetch("/api/auth/save-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: session?.user?.name,
            userType,
          }),
        });

        if (saveRes.ok) {
          // Success - redirect to dashboard
          router.replace(`/${userType}/dashboard`);
        } else {
          const saveData = await saveRes.json();
          setError(saveData.error || "Không thể lưu thông tin");
          setLoading(false);
          return;
        }
      } else {
        setError(data.error || "Xác thực thất bại");
        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft);
        }
      }
    } catch (err) {
      console.error("verify otp error", err);
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending) return;
    setCode("");
    setError("");
    setResending(true);
    await sendOtp();
    setResending(false);
  };

  if (
    status === "loading" ||
    sendStatus === "sending" ||
    sendStatus === "idle"
  ) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Đang gửi mã xác thực...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-[#ab3f20]/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-[#ab3f20]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Xác thực email</h1>
          <p className="text-base text-gray-600">
            Chúng tôi đã gửi mã 6 chữ số đến
            <br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8 space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mã xác thực
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border-2 border-gray-200 rounded-xl focus:border-[#ab3f20] focus:outline-none transition-colors"
                disabled={loading}
                autoFocus
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {error}
                {attemptsLeft < 5 && attemptsLeft > 0 && (
                  <span className="block mt-1 text-xs text-red-600">
                    Còn {attemptsLeft} lần thử
                  </span>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#ab3f20] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8b2f15] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xác thực..." : "Xác thực"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || loading}
              className="text-sm text-[#ab3f20] hover:text-[#8b2f15] font-semibold disabled:opacity-50"
            >
              {resending ? "Đang gửi..." : "Gửi lại mã"}
            </button>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-[#ab3f20] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Mã có hiệu lực 5 phút
              </p>
              <p className="text-xs">
                Kiểm tra hộp thư spam nếu không thấy email. Mỗi email chỉ có thể
                yêu cầu mã mới sau 30 giây.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </main>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
