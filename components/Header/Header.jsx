import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const navLinks = [{ name: "Trang chủ", path: "/" }];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;
        const scrollThreshold = 10;

        if (Math.abs(currentScrollY - lastScrollY) >= scrollThreshold) {
          let nextShowHeader = showHeader;

          if (currentScrollY <= 100) {
            nextShowHeader = true;
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nextShowHeader = false;
          } else if (currentScrollY < lastScrollY) {
            nextShowHeader = true;
          }

          if (nextShowHeader !== showHeader) {
            setShowHeader(nextShowHeader);
          }

          lastScrollYRef.current = currentScrollY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showHeader]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ease-in-out ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between sm:px-4 py-4">
        <Link href="/" className="flex items-center gap-2 z-10">
          <Image
            src="/logo.png"
            alt="Cviro logo"
            width={480}
            height={144}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-[#ab3f20] hover:scale-105 ${
                  isActive ? "text-[#ab3f20]" : "text-[#333333]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            href="/signup"
            className="rounded-xl bg-[#ab3f20] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:brightness-95 hover:scale-105 active:scale-95"
          >
            Đăng ký ngay
          </Link>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-[#333333] md:hidden z-10 p-1 transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <IoClose /> : <IoMenuSharp />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-0 bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 60 }} // Ensure it stays above the header
      >
        <nav className="flex flex-col px-4 py-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-[#f5f5f5] hover:translate-x-2 ${
                  isActive ? "text-[#ab3f20] bg-[#ab3f20]/10" : "text-[#333333]"
                }`
              }
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 rounded-xl bg-[#ab3f20] px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:brightness-95 hover:scale-105 active:scale-95"
            style={{
              transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : "0ms",
            }}
          >
            Đăng ký ngay
          </Link>
        </nav>
      </div>
    </header>
  );
}
