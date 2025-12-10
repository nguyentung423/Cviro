import { LogIn, FileText, MessageCircle, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Đăng nhập nhanh",
    description: "Sử dụng tài khoản Google để bắt đầu ngay lập tức. Không cần điền form đăng ký phức tạp.",
    icon: LogIn,
  },
  {
    id: "02",
    title: "Tìm & Ứng tuyển",
    description: "Duyệt danh sách công việc đã được chọn lọc. Ứng tuyển chỉ với một cú click chuột.",
    icon: FileText,
  },
  {
    id: "03",
    title: "Kết nối Zalo",
    description: "Khi hồ sơ được duyệt, bạn sẽ nhận được link Zalo để trao đổi trực tiếp với nhà tuyển dụng.",
    icon: MessageCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quy trình đơn giản hóa
          </h2>
          <p className="text-lg text-gray-600">
            Chúng tôi loại bỏ mọi rào cản để bạn có thể kết nối với công việc nhanh nhất có thể.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                {/* Icon Circle */}
                <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:border-[#ab3f20]/30 group-hover:shadow-md transition-all duration-300 relative z-10">
                  <div className="w-20 h-20 bg-[#ab3f20]/5 rounded-full flex items-center justify-center group-hover:bg-[#ab3f20]/10 transition-colors">
                    <Icon className="w-8 h-8 text-[#ab3f20]" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ab3f20] text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white">
                    {step.id}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ab3f20] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature List */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-600">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Miễn phí trọn đời</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Không spam email</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Kết nối trực tiếp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
