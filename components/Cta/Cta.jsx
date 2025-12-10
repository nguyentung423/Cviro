"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, MessageCircle } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Nhận job event?
        </h2>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Hàng trăm job đã duyệt sẵn, chỉ chờ bạn nhận.
          <br className="hidden md:block" />
          <span className="font-medium text-gray-900">
            Agency duyệt hồ sơ → Chat Zalo → Bắt đầu ngay.
          </span>
        </p>

        {/* Primary Action */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <Link
            href="/login/candidate"
            className="inline-flex items-center gap-3 bg-[#ab3f20] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#8b2f15] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Đăng nhập với Google
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-500">
            Miễn phí 100% • Không cần thẻ tín dụng
          </p>
        </div>

        {/* Benefits Grid - Matching HowItWorks style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Nhanh chóng</h3>
            <p className="text-gray-600 text-sm">Ứng tuyển chỉ 1 phút</p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3 text-green-600">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Trực tiếp</h3>
            <p className="text-gray-600 text-sm">Chat Zalo với agency</p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-3 text-purple-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Minh bạch</h3>
            <p className="text-gray-600 text-sm">Thông tin rõ ràng 100%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
