import { useState, useEffect } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

// HERO SECTION — MOBILE OPTIMIZED
// Aggressive mobile optimization: reduced particles, disabled parallax, optimized animations

// Helper function to generate floating particles with consistent positions
const generateFloatingParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + Math.random() * 4}s`,
        }}
      >
        <div
          className="h-2 w-2 rounded-full opacity-40"
          style={{ backgroundColor: ["#f0b33a", "#ab3f20", "#536b4e"][i % 3] }}
        />
      </div>
    );
  }
  return particles;
};

export default function Hero() {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [currentShift, setCurrentShift] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Zalo support link
  const zaloUrl = "https://zalo.me/0374918396";

  // Client-side only flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Interactive mouse tracking - DISABLED on mobile
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Auto-rotating shifts - DISABLED on mobile for performance
  const hotShifts = [
    {
      role: "PG Booth",
      time: "14:00–22:00",
      pay: "450k",
      location: "Times City",
      date: "14/09",
    },
    {
      role: "MC Event",
      time: "18:00–23:00",
      pay: "800k",
      location: "Vincom Center",
      date: "15/09",
    },
    {
      role: "Sampling",
      time: "10:00–18:00",
      pay: "350k",
      location: "AEON Mall",
      date: "16/09",
    },
  ];

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setCurrentShift((prev) => (prev + 1) % hotShifts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#ffffff] via-[#f8f9fa] to-[#f5f5f5]"
      aria-label="Cviro hero section"
    >
      {/* Floating Zalo support button */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Zalo support"
        className="fixed bottom-6 right-4 sm:right-6 z-50 inline-flex items-center gap-3 rounded-full bg-white/95 border border-[#0068ff]/20 px-4 py-2 shadow-lg backdrop-blur-md text-sm font-semibold text-[#1f2d3d] hover:shadow-xl transition-all"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0068ff] text-white text-xs font-bold shadow-sm">
          Zalo
        </span>
        <span className="leading-tight">Chat hỗ trợ</span>
      </a>

      {/* Optimized Background Layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Animated gradient mesh - disabled on mobile */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-30 will-change-auto"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${
                mousePosition.y
              }%, #f0b33a15 0%, transparent 50%), 
                          radial-gradient(circle at ${100 - mousePosition.x}% ${
                100 - mousePosition.y
              }%, #ab3f2015 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Static grid - no animation on mobile */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 ${
            isMobile ? "" : "animate-pulse"
          }`}
        />

        {/* Floating particles - only render on client to avoid hydration mismatch */}
        {isClient && generateFloatingParticles(isMobile ? 4 : 8)}
      </div>

      <div className="container mx-auto px-4 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: Enhanced Copy & CTAs */}
          <div className="relative z-10 space-y-8">
            {/* Premium badge with glow */}
            <div className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#e0e0e0]/50 bg-white/60 px-4 py-2 text-sm font-medium text-[#536b4e] shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl">
              <div className="absolute inset-0 bg-linear-to-r from-[#ab3f20]/10 to-[#f0b33a]/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-[#ab3f20] animate-pulse" />
              <span className="relative z-10">
                Hơn 5000+ việc làm mỗi tháng
              </span>
            </div>

            {/* Hero headline - mobile optimized */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-[28px] font-black leading-tight text-[#333333] sm:text-4xl md:text-5xl lg:text-6xl will-change-transform">
                <span className="block animate-slideInUp">
                  Kết nối nhân sự sự kiện
                </span>

                <span
                  className="relative block animate-slideInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="relative inline-flex items-center gap-2 sm:gap-3 md:gap-4">
                    <span className="relative z-10 bg-linear-to-r from-[#ab3f20] via-[#f0b33a] to-[#ab3f20] bg-clip-text text-transparent bg-size-200 animate-gradientShift">
                      Nhanh
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-[#f0b33a] to-[#ab3f20]"></span>
                    <span className="relative z-10 bg-linear-to-r from-[#ab3f20] via-[#f0b33a] to-[#ab3f20] bg-clip-text text-transparent bg-size-200 animate-gradientShift">
                      Chuẩn
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-[#f0b33a] to-[#ab3f20]"></span>
                    <span className="relative z-10 bg-linear-to-r from-[#ab3f20] via-[#f0b33a] to-[#ab3f20] bg-clip-text text-transparent bg-size-200 animate-gradientShift">
                      Uy tín
                    </span>
                    {/* Animated underline */}
                    <span className="absolute -bottom-5 left-0 h-2 w-0 rounded-full bg-linear-to-r from-[#f0b33a] to-[#ab3f20] animate-expandWidth" />
                  </span>
                </span>
              </h1>
            </div>

            <p
              className="max-w-2xl text-base leading-relaxed text-[#333333]/75 sm:text-lg md:text-xl animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              Tìm việc, quản lý nhân sự và kết nối đối tác - Tất cả trong vài
              phút
            </p>

            {/* CTAs - mobile optimized */}
            <div
              className="flex flex-col gap-3 sm:gap-4 sm:flex-row animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              {/* ✅ Tìm việc ngay → LoginCandidate */}
              <Link
                href="/login/candidate"
                className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-[#ab3f20] to-[#ab3f20]/90 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-white shadow-2xl shadow-[#ab3f20]/30 transition-all hover:scale-105 hover:shadow-[#ab3f20]/40 active:scale-95 will-change-transform"
              >
                <span className="absolute inset-0 bg-linear-to-r from-[#f0b33a] to-[#ab3f20] opacity-0 transition-opacity group-hover:opacity-20" />
                <span className="relative z-10">Tìm việc ngay</span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-8 transform text-2xl transition-transform group-hover:translate-x-2">
                  →
                </div>
              </Link>

              {/* ✅ Đăng ký đối tác → LoginAgency */}
              <Link
                href="/login/agency"
                className="group relative overflow-hidden rounded-2xl border-2 border-[#e0e0e0] bg-white/80 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-[#333333] backdrop-blur-md transition-all hover:border-[#536b4e] hover:scale-105 hover:bg-white hover:text-[#536b4e] hover:shadow-xl active:scale-95 will-change-transform"
              >
                <span className="absolute inset-0 bg-linear-to-r from-[#536b4e]/10 to-[#f0b33a]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative z-10">Tuyển dụng ngay</span>
              </Link>
            </div>

            {/* Social proof - mobile optimized */}
            <div
              className="flex flex-wrap items-center gap-3 md:gap-6 animate-fadeInUp"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="group flex items-center gap-3 rounded-2xl bg-linear-to-r from-[#f5f5f5] to-white/80 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#536b4e] shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[#333333]">3000+</div>
                  <div className="text-xs text-[#333333]/60">ca làm/tháng</div>
                </div>
              </div>

              <div className="group flex items-center gap-3 rounded-2xl bg-linear-to-r from-[#fff7e6] to-[#fef3cd]/80 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0b33a] shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[#ab3f20]">120+</div>
                  <div className="text-xs text-[#ab3f20]/70">
                    agencies tin dùng
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Premium Visual - simplified on mobile */}
          <div
            className="relative z-10 animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="mx-auto w-full max-w-md">
              {/* Premium phone frame with glass morphism */}
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 p-4 md:p-6 shadow-2xl backdrop-blur-xl">
                {/* Enhanced top bar - hidden on mobile */}
                <div className="mb-4 md:mb-6 hidden md:flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#ab3f20] animate-pulse" />
                    <div
                      className="h-3 w-3 rounded-full bg-[#f0b33a] animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="h-3 w-3 rounded-full bg-[#536b4e] animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                  <div className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-[#333333]/80 backdrop-blur-sm">
                    Live Preview
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {/* Dynamic hot shift card - always visible */}
                  <div
                    className="group relative overflow-hidden rounded-3xl border border-white/30 bg-linear-to-br from-white/60 to-white/40 p-4 md:p-5 shadow-xl backdrop-blur-md transition-all hover:scale-[1.02] hover:shadow-2xl"
                    onMouseEnter={() => setHoveredCard("hot")}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-[#ab3f20]/10 to-[#f0b33a]/10 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm md:text-base font-bold text-[#333333]">
                          🔥 Hot Shift
                        </span>
                        <span className="animate-bounce rounded-full bg-[#536b4e]/20 px-2 md:px-3 py-1 text-xs font-medium text-[#536b4e]">
                          Hà Nội
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-base md:text-lg font-semibold text-[#333333]">
                          {hotShifts[currentShift].role}
                        </p>
                        <p className="text-xs md:text-sm text-[#333333]/80">
                          {hotShifts[currentShift].time} •{" "}
                          <span className="font-bold text-[#ab3f20]">
                            {hotShifts[currentShift].pay}
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-[#333333]/60 truncate">
                          {hotShifts[currentShift].location},{" "}
                          {hotShifts[currentShift].date}
                        </span>
                        <Link
                          href="/login/candidate"
                          className="group relative overflow-hidden rounded-xl bg-linear-to-r from-[#ab3f20] to-[#ab3f20]/90 px-3 md:px-4 py-2 text-xs md:text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                        >
                          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                          <span className="relative">Ứng tuyển</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced upcoming events - desktop only */}
                  <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/30 bg-linear-to-br from-white/70 to-white/50 p-5 shadow-xl backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-base font-bold text-[#333333]">
                        📅 Sự kiện sắp tới
                      </span>
                      <span className="text-xs text-[#333333]/60">
                        Tuần này
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          title: "Tech Expo 2025",
                          tag: "SUP",
                          tone: "#ab3f20",
                          icon: "💼",
                        },
                        {
                          title: "Food & Drink Fest",
                          tag: "Sampling",
                          tone: "#536b4e",
                          icon: "🍽️",
                        },
                        {
                          title: "Auto Show",
                          tag: "PG/PB",
                          tone: "#f0b33a",
                          icon: "🚗",
                        },
                      ].map((event, i) => (
                        <div
                          key={i}
                          className="group flex items-center justify-between rounded-2xl bg-linear-to-r from-[#f5f5f5]/80 to-white/60 p-4 shadow-md backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{event.icon}</span>
                            <span className="text-sm font-medium text-[#333333]">
                              {event.title}
                            </span>
                          </div>
                          <span
                            className="rounded-xl px-3 py-1.5 text-xs font-bold shadow-sm transition-all group-hover:scale-105"
                            style={{
                              backgroundColor: `${event.tone}20`,
                              color: event.tone,
                              border: `1px solid ${event.tone}40`,
                            }}
                          >
                            {event.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive role picker - now visible on mobile with wrap */}
                  <div className="rounded-3xl border border-white/30 bg-linear-to-br from-white/80 to-white/60 p-4 shadow-xl backdrop-blur-md">
                    <div className="mb-3 text-base font-bold text-[#333333]">
                      🎯 Vai trò phổ biến
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "PG/PB",
                        "Mascot",
                        "MC/Host",
                        "Supervisor",
                        "Kỹ thuật âm thanh",
                      ].map((role, i) => (
                        <span
                          key={role}
                          className="cursor-pointer select-none rounded-full border border-white/40 bg-white/80 px-3 py-2 text-xs font-medium text-[#333333] backdrop-blur-sm transition-all hover:scale-105 hover:border-[#536b4e]/60 hover:bg-[#536b4e]/10 hover:text-[#536b4e] active:scale-95"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium floating badges */}
              <div className="pointer-events-none absolute -left-8 -bottom-8 rotate-[-5deg] transform rounded-2xl border border-white/30 bg-linear-to-r from-white/80 to-white/60 px-4 py-3 shadow-2xl backdrop-blur-xl animate-float">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#f0b33a] animate-pulse" />
                </div>
              </div>

              <div
                className="pointer-events-none absolute -right-6 top-8 rotate-[8deg] transform rounded-2xl border border-white/30 bg-linear-to-r from-white/80 to-white/60 px-3 py-2 shadow-2xl backdrop-blur-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#ab3f20] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
