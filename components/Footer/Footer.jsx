import Image from "next/image";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Users,
  Briefcase,
  Award,
  ChevronUp,
} from "lucide-react";

const quickLinks = [
  { name: "Tìm việc", href: "/candidate/jobs", popular: true },
  { name: "Đăng ký nhân sự", href: "/signup", popular: true },
  { name: "Đăng tuyển", href: "/agency", note: "coming-soon" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "Liên hệ", href: "#contact", note: "coming-soon" },
];

const supportLinks = [
  { name: "Trung tâm trợ giúp", href: "#help", note: "coming-soon" },
  { name: "Hướng dẫn sử dụng", href: "#guide", note: "coming-soon" },
  { name: "Chính sách bảo mật", href: "#privacy", note: "coming-soon" },
  { name: "Điều khoản dịch vụ", href: "#terms", note: "coming-soon" },
  { name: "FAQ", href: "#faq", note: "coming-soon" },
];

const companyInfo = [
  { name: "Tin tức", href: "#news", note: "coming-soon" },
  { name: "Sự nghiệp", href: "#careers", note: "coming-soon" },
  { name: "Đối tác", href: "#partners", note: "coming-soon" },
  { name: "Báo chí", href: "#press", note: "coming-soon" },
  { name: "Blog", href: "/blog" },
];

const stats = [
  { icon: Users, number: "5000+", label: "Nhân sự" },
  { icon: Briefcase, number: "500+", label: "Dự án" },
  { icon: Award, number: "98%", label: "Hài lòng" },
  { icon: Star, number: "4.9", label: "Đánh giá" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", name: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#333333] to-[#2a2a2a] text-white relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#ab3f20] hover:bg-[#536b4e] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
      </button>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Top section with brand and newsletter */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2 items-center">
          {/* Brand section */}
          <div>
            <div className="mb-6 text-left">
              <div className="flex flex-col items-start">
                <Image
                  src="/logo.png"
                  alt="Cviro logo"
                  width={160}
                  height={64}
                  className="h-16 object-contain mb-4"
                />
                <p className="text-lg text-white/90 max-w-md">
                  Nền tảng kết nối{" "}
                  <span className="text-[#f0b33a]">
                    Brand – Agency – Nhân sự
                  </span>{" "}
                  sự kiện hàng đầu Việt Nam.
                </p>
              </div>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[#ab3f20]/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#ab3f20]" />
                  </div>
                  <div className="text-lg font-bold text-[#f0b33a]">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-xl font-bold mb-2">Nhận thông tin mới nhất</h4>
            <p className="text-white/70 mb-4">
              Đăng ký để nhận tin tức về cơ hội việc làm và sự kiện mới
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ab3f20]"
              />
              <button className="bg-[#ab3f20] hover:bg-[#536b4e] px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2">
                <span className="hidden sm:inline">Đăng ký</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ab3f20] rounded-full"></div>
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#f0b33a] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    {link.popular && (
                      <span className="bg-[#ab3f20] text-white text-xs px-2 py-1 rounded-full">
                        Hot
                      </span>
                    )}
                    {link.note === "coming-soon" && (
                      <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full border border-white/20">
                        Sắp ra mắt
                      </span>
                    )}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-[#f0b33a] rounded-full"></div>
              Hỗ trợ
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#f0b33a] transition-colors duration-300 group flex items-center gap-2"
                  >
                    <span>{link.name}</span>
                    {link.note === "coming-soon" && (
                      <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full border border-white/20">
                        Sắp ra mắt
                      </span>
                    )}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-[#536b4e] rounded-full"></div>
              Công ty
            </h4>
            <ul className="space-y-3">
              {companyInfo.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#f0b33a] transition-colors duration-300 group flex items-center gap-2"
                  >
                    <span>{link.name}</span>
                    {link.note === "coming-soon" && (
                      <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full border border-white/20">
                        Sắp ra mắt
                      </span>
                    )}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-[#f0b33a] rounded-full"></div>
              Liên hệ
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">Email</p>
                  <a
                    href="mailto:support@cviro.com"
                    className="text-white/70 hover:text-[#f0b33a] transition-colors duration-300"
                  >
                    support@cviro.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">Hotline</p>
                  <a
                    href="tel:0123456789"
                    className="text-white/70 hover:text-[#f0b33a] transition-colors duration-300"
                  >
                    037 491 8396
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">Địa chỉ</p>
                  <p className="text-white/70">Hà Nội – TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social media and bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">
                Kết nối với chúng tôi:
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-[#ab3f20] rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-white/60 text-sm text-center md:text-right">
              <p>© {new Date().getFullYear()} Cviro. All rights reserved.</p>
              <p className="text-xs mt-1">Made with ❤️ in Vietnam</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
