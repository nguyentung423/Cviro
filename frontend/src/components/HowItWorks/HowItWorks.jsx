import { UserPlus, Search, CreditCard, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const steps = [
  {
    id: 1,
    title: "Đăng ký tài khoản",
    description: "Tạo hồ sơ cá nhân với thông tin cơ bản và kỹ năng của bạn. Hoàn toàn miễn phí chỉ trong 2 phút.",
    icon: <UserPlus className="h-6 w-6" />,
    gradient: "from-[#ab3f20] to-[#8b2f15]",
  },
  {
    id: 2,
    title: "Tìm & ứng tuyển",
    description: "Duyệt các ca làm việc phù hợp với kỹ năng của bạn. Ứng tuyển nhanh chỉ với 1 click.",
    icon: <Search className="h-6 w-6" />,
    gradient: "from-[#536b4e] to-[#3d5037]",
  },
  {
    id: 3,
    title: "Làm việc & nhận lương",
    description: "Check-in tại sự kiện, hoàn thành công việc và nhận thanh toán tự động ngay sau khi hoàn thành.",
    icon: <CreditCard className="h-6 w-6" />,
    gradient: "from-[#f0b33a] to-[#d49520]",
  },
];

const userTypes = [
  {
    type: "staff",
    label: "Nhân sự",
    description: "Dành cho freelancer, part-time"
  },
  {
    type: "agency",
    label: "Agency",
    description: "Dành cho công ty, đối tác"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const isMobile = useIsMobile();

  return (
    <section className="bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa] py-12 md:py-20" aria-label="Cách Cviro hoạt động">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header - mobile optimized */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="mx-auto mb-3 md:mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg">
            <Zap className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 md:mb-3">
            3 bước đơn giản
          </h2>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto px-4">
            Bắt đầu kiếm tiền với Cviro chỉ trong vài phút
          </p>
        </div>

        {/* Steps Grid - mobile-first */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3 mb-8 md:mb-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative cursor-pointer rounded-3xl bg-white border-2 border-[#e0e0e0] p-5 md:p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#ab3f20] ${isMobile ? '' : 'hover:-translate-y-2'} will-change-auto`}
              onClick={() => setActiveStep(step.id)}
            >
              {/* Step number badge */}
              <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white font-bold shadow-lg">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`mx-auto mb-3 md:mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg transition-transform duration-300 ${isMobile ? '' : 'group-hover:scale-110'}`}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#1a1a1a] group-hover:text-[#ab3f20] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector - hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8 text-[#ab3f20]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA - mobile optimized */}
        <div className="text-center px-4">
          <div className="inline-flex flex-col items-center gap-4 md:gap-6 rounded-3xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] p-6 md:p-8 text-white shadow-2xl max-w-2xl w-full">
            <h3 className="text-xl md:text-2xl font-bold">Sẵn sàng bắt đầu?</h3>
            <p className="text-white/90 text-sm md:text-base">
              Tham gia Cviro ngay hôm nay và khám phá hàng nghìn cơ hội việc làm hấp dẫn trong ngành sự kiện.
            </p>
            <button className="rounded-xl bg-white px-6 md:px-8 py-3 text-sm font-bold text-[#ab3f20] shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 will-change-transform">
              Đăng ký ngay
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}