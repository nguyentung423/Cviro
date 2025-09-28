
import { Flame, Clock, MapPin, Calendar, DollarSign, Zap, Users, AlertCircle, Timer } from "lucide-react";
import { useState, useEffect } from "react";

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
    duration: "8 giờ",
    category: "Promotion",
    requirements: ["Ngoại hình khá", "Giao tiếp tốt"],
    deadline: "12:00 hôm nay",
    image: "/cm.svg",
    description: "Tư vấn và giới thiệu sản phẩm tại booth trưng bày sản phẩm công nghệ"
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
    duration: "8 giờ",
    category: "Sampling",
    requirements: ["Năng động", "Thân thiện"],
    deadline: "08:00 ngày mai",
    image: "cm.svg",
    description: "Phát mẫu thử sản phẩm thực phẩm và thu thập feedback khách hàng"
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
    duration: "3 giờ",
    category: "Entertainment",
    requirements: ["Cao 1m6-1m7", "Sức khỏe tốt"],
    deadline: "16:00 hôm nay",
    image: "cm.svg",
    description: "Hóa thân thành mascot thương hiệu để tương tác và chụp ảnh với khách"
  },
];

const urgencyConfig = {
  critical: {
    color: "#e74c3c",
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
    badge: "bg-gradient-to-r from-red-500 to-red-600",
    label: "Cực gấp",
    pulse: true
  },
  high: {
    color: "#f39c12", 
    bg: "bg-orange-50 border-orange-200",
    text: "text-orange-700",
    badge: "bg-gradient-to-r from-orange-500 to-orange-600",
    label: "Gấp",
    pulse: false
  },
  medium: {
    color: "#27ae60",
    bg: "bg-green-50 border-green-200", 
    text: "text-green-700",
    badge: "bg-gradient-to-r from-green-500 to-green-600",
    label: "Bình thường",
    pulse: false
  }
};

export default function HotShifts() {
  const [timeLeft, setTimeLeft] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  // Simulate countdown timer for deadlines
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft = {};
      
      shifts.forEach(shift => {
        // Simulate countdown (in real app, parse actual deadline)
        const hours = Math.floor(Math.random() * 12) + 1;
        const minutes = Math.floor(Math.random() * 60);
        newTimeLeft[shift.id] = `${hours}h ${minutes}m`;
      });
      
      setTimeLeft(newTimeLeft);
    }, 60000); // Update every minute

    // Initial load
    const initialTimeLeft = {};
    shifts.forEach(shift => {
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.floor(Math.random() * 60);
      initialTimeLeft[shift.id] = `${hours}h ${minutes}m`;
    });
    setTimeLeft(initialTimeLeft);

    return () => clearInterval(timer);
  }, []);

  const formatPay = (pay) => {
    return pay.replace('k', '.000đ');
  };

  const getUrgencyIcon = (urgency) => {
    if (urgency === 'critical') return <AlertCircle className="h-3 w-3" />;
    if (urgency === 'high') return <Zap className="h-3 w-3" />;
    return <Clock className="h-3 w-3" />;
  };

  return (
    <section className="bg-gradient-to-br from-[#fff8f5] to-[#fff0eb] py-20" aria-label="Ca làm gấp hôm nay">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg animate-pulse">
            <Flame className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-3">
            Ca làm gấp hôm nay
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Những ca nóng cần nhân sự ngay, ứng tuyển nhanh để không bỏ lỡ cơ hội kiếm tiền
          </p>

          {/* Stats bar */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-6 rounded-xl bg-white px-6 py-3 shadow-md border border-[#e0e0e0]">
              <div className="flex items-center gap-2 text-[#ab3f20]">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-semibold">{shifts.length} ca đang hot</span>
              </div>
              <div className="h-4 w-px bg-[#e0e0e0]"></div>
              <div className="flex items-center gap-2 text-[#666666]">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {shifts.reduce((sum, shift) => sum + shift.spotsLeft, 0)} vị trí còn lại
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shift cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {shifts.map((shift) => {
            const urgency = urgencyConfig[shift.urgency];
            
            return (
              <div
                key={shift.id}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${urgency.bg} ${
                  hoveredCard === shift.id ? "scale-[1.02]" : ""
                }`}
                onMouseEnter={() => setHoveredCard(shift.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Urgency indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                     style={{ background: `linear-gradient(90deg, ${urgency.color}, ${urgency.color}80)` }}></div>

                {/* Status badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${urgency.badge} ${urgency.pulse ? 'animate-pulse' : ''}`}>
                    {getUrgencyIcon(shift.urgency)}
                    {urgency.label}
                  </div>
                  
                  {shift.spotsLeft <= 2 && (
                    <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                      <AlertCircle className="h-3 w-3" />
                      Chỉ còn {shift.spotsLeft}
                    </div>
                  )}
                </div>

                {/* Countdown timer */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white">
                    <div className="flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      {timeLeft[shift.id] || "Loading..."}
                    </div>
                  </div>
                </div>

                {/* Shift image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={shift.image}
                    alt={shift.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Pay highlight */}
                  <div className="absolute bottom-4 right-4">
                    <div className="rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-[#ab3f20]" />
                        <span className="text-lg font-bold text-[#ab3f20]">
                          {formatPay(shift.pay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title and category */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#ab3f20] transition-colors duration-200">
                        {shift.title}
                      </h3>
                    </div>
                    
                    <div className="inline-flex items-center rounded-full bg-[#ab3f20]/10 px-3 py-1 text-sm font-semibold text-[#ab3f20]">
                      {shift.category}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                    {shift.description}
                  </p>

                  {/* Shift details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#666666]">
                        <Clock className="h-4 w-4 text-[#ab3f20]" />
                        <span>{shift.time}</span>
                      </div>
                      <span className="text-xs bg-[#f8f9fa] px-2 py-1 rounded-md text-[#666666]">
                        {shift.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <Calendar className="h-4 w-4 text-[#ab3f20]" />
                      <span className="font-medium">{shift.date}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm text-[#666666]">
                      <MapPin className="h-4 w-4 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                      <span>{shift.location}</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-2">Yêu cầu:</h4>
                    <div className="flex flex-wrap gap-1">
                      {shift.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="inline-block rounded-md bg-[#f8f9fa] px-2 py-1 text-xs text-[#666666] border"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deadline warning */}
                  <div className={`mb-4 rounded-lg p-3 border-l-4 ${urgency.bg}`}
                       style={{ borderLeftColor: urgency.color }}>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" style={{ color: urgency.color }} />
                      <span className={`text-sm font-medium ${urgency.text}`}>
                        Hạn ứng tuyển: {shift.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
                  <button
                    className="group/button w-full rounded-xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95"
                    aria-label={`Ứng tuyển ${shift.title}`}
                  >
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
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-lg border border-[#e0e0e0]">
            <div className="flex items-center gap-2 text-[#ab3f20]">
              <Flame className="h-5 w-5" />
              <span className="font-bold text-lg">Cảnh báo nóng!</span>
            </div>
            <p className="text-[#666666] max-w-md">
              Các ca làm việc này có thể được đóng bất cứ lúc nào khi đủ nhân sự. 
              <strong> Ứng tuyển ngay để không bỏ lỡ!</strong>
            </p>
            <button className="rounded-xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] px-8 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200">
              Xem thêm ca gấp khác
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}