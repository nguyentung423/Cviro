import { Flame, Clock, MapPin, DollarSign, Zap, Users, ArrowRight } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";

const shifts = [
  {
    id: 1,
    title: "PG Booth",
    time: "14:00 – 22:00",
    pay: "450k",
    location: "Times City, Hà Nội",
    date: "15/09/2025",
    urgency: "high",
    spotsLeft: 3,
  },
  {
    id: 2,
    title: "Sampling Event", 
    time: "09:00 – 17:00",
    pay: "400k",
    location: "Vincom Bà Triệu, Hà Nội",
    date: "16/09/2025",
    urgency: "medium",
    spotsLeft: 5,
  },
  {
    id: 3,
    title: "Mascot Show",
    time: "18:00 – 21:00", 
    pay: "500k",
    location: "Aeon Mall, TP.HCM",
    date: "16/09/2025",
    urgency: "critical",
    spotsLeft: 1,
  },
];

const urgencyConfig = {
  critical: {
    badge: "bg-gradient-to-r from-red-500 to-red-600",
    label: "Cực gấp",
  },
  high: {
    badge: "bg-gradient-to-r from-orange-500 to-orange-600",
    label: "Gấp",
  },
  medium: {
    badge: "bg-gradient-to-r from-green-500 to-green-600",
    label: "Bình thường",
  }
};

export default function HotShifts() {
  const isMobile = useIsMobile();
  const formatPay = (pay) => pay.replace('k', '.000đ');

  return (
    <section className="bg-gradient-to-br from-[#fff8f5] to-[#fff0eb] py-12 md:py-20" aria-label="Ca làm gấp hôm nay">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header - mobile optimized */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="mx-auto mb-3 md:mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg will-change-transform">
            <Flame className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 md:mb-3">
            Ca làm gấp hôm nay
          </h2>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto px-4">
            Những ca nóng cần nhân sự ngay, ứng tuyển nhanh để không bỏ lỡ cơ hội
          </p>
        </div>

        {/* Shift cards - mobile-first grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 md:mb-8">
          {shifts.map((shift) => {
            const urgency = urgencyConfig[shift.urgency];
            
            return (
              <div
                key={shift.id}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg border-2 border-[#e0e0e0] transition-all duration-300 hover:shadow-2xl hover:border-[#ab3f20] ${isMobile ? '' : 'hover:-translate-y-2'} will-change-auto flex flex-col`}
              >
                {/* Urgency badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${urgency.badge}`}>
                    <Flame className="h-3 w-3" />
                    {urgency.label}
                  </div>
                </div>

                {/* Pay highlight */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-[#ab3f20]" />
                      <span className="text-lg font-bold text-[#ab3f20]">
                        {formatPay(shift.pay)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 pt-14 md:pt-16 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3 md:mb-4 group-hover:text-[#ab3f20] transition-colors">
                    {shift.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4 md:mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <Clock className="h-4 w-4 text-[#ab3f20]" />
                      <span>{shift.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-[#666666]">
                      <MapPin className="h-4 w-4 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                      <span>{shift.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-orange-600 font-medium min-h-[20px]">
                      {shift.spotsLeft <= 3 && (
                        <>
                          <Users className="h-4 w-4" />
                          <span>Chỉ còn {shift.spotsLeft} vị trí</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="w-full rounded-xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4" />
                      Ứng tuyển ngay
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#ab3f20] shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-[#ab3f20]">
            Xem tất cả ca gấp
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}