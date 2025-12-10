import { CalendarDays, MapPin, Clock, Users, ChevronRight, Star, Briefcase } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Tech Expo 2025",
    date: "20/09/2025",
    time: "08:00 - 18:00",
    location: "Hà Nội",
    venue: "Trung tâm Hội nghị Quốc gia",
    role: "Supervisor",
    color: "#ab3f20",
    salary: "1.500.000đ/ngày",
    positions: 15,
    requirements: ["Kinh nghiệm 2+ năm", "Tiếng Anh giao tiếp"],
    featured: true,
    urgent: false,
    image: "cm.svg",
    description: "Hội chợ công nghệ lớn nhất năm với sự tham gia của 200+ doanh nghiệp hàng đầu."
  },
  {
    id: 2,
    title: "Food & Drink Festival",
    date: "25/09/2025",
    time: "09:00 - 22:00",
    location: "TP.HCM",
    venue: "Công viên Tao Đàn",
    role: "Sampling",
    color: "#536b4e",
    salary: "800.000đ/ngày",
    positions: 25,
    requirements: ["Ngoại hình khá", "Năng động"],
    featured: false,
    urgent: true,
    image: "cm.svg",
    description: "Lễ hội ẩm thực đậm chất Việt với hơn 100 gian hàng đặc sản từ khắp ba miền."
  },
  {
    id: 3,
    title: "Auto Show Vietnam",
    date: "30/09/2025",
    time: "10:00 - 20:00",
    location: "Đà Nẵng",
    venue: "Trung tâm Hội chợ Triển lãm",
    role: "PG/PB",
    color: "#f0b33a",
    salary: "1.200.000đ/ngày",
    positions: 20,
    requirements: ["Cao từ 1m65", "Có kinh nghiệm PG"],
    featured: true,
    urgent: false,
    image: "cm.svg",
    description: "Triển lãm ô tô quy mô lớn với sự góp mặt của các thương hiệu nổi tiếng thế giới."
  },
];

export default function UpcomingEvents() {
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredEvents = events.filter(event => {
    if (filter === "featured") return event.featured;
    if (filter === "urgent") return event.urgent;
    return true;
  });

  const formatSalary = (salary) => {
    return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <section className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-20" aria-label="Sự kiện sắp tới">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg">
            <CalendarDays className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-3">
            Sự kiện sắp tới
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Cập nhật nhanh các sự kiện lớn để bạn không bỏ lỡ cơ hội việc làm hấp dẫn
          </p>
          
          {/* Filter tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-white p-1 shadow-sm border border-[#e0e0e0]">
              {[
                { key: "all", label: "Tất cả" },
                { key: "featured", label: "Nổi bật" },
                { key: "urgent", label: "Gấp" }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === key
                      ? "bg-[#ab3f20] text-white shadow-md"
                      : "text-[#666666] hover:text-[#ab3f20]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-[#e0e0e0] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                hoveredCard === event.id ? "scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Status badges */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {event.featured && (
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                    Nổi bật
                  </div>
                )}
                {event.urgent && (
                  <div className="animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    Tuyển gấp
                  </div>
                )}
              </div>

              {/* Event image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Salary badge */}
                <div className="absolute bottom-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1">
                  <span className="text-sm font-bold text-[#ab3f20]">
                    {formatSalary(event.salary)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Title and role */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#ab3f20] transition-colors duration-200 flex-1">
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold"
                      style={{
                        backgroundColor: `${event.color}15`,
                        color: event.color,
                      }}
                    >
                      <Briefcase className="h-3 w-3" />
                      {event.role}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[#666666]">
                      <Users className="h-3 w-3" />
                      {event.positions} vị trí
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#666666]">
                    <CalendarDays className="h-4 w-4 text-[#ab3f20]" />
                    <span className="font-medium">{event.date}</span>
                    <Clock className="h-4 w-4 text-[#ab3f20] ml-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-[#666666]">
                    <MapPin className="h-4 w-4 text-[#ab3f20] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-xs text-[#999999]">{event.venue}</div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#1a1a1a] mb-2">Yêu cầu:</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-md bg-[#f8f9fa] px-2 py-1 text-xs text-[#666666] border"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  className="group/button w-full rounded-xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  aria-label={`Ứng tuyển ${event.title}`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Ứng tuyển ngay
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-md border border-[#e0e0e0]">
            <span className="text-[#666666]">Không tìm thấy sự kiện phù hợp?</span>
            <button className="font-semibold text-[#ab3f20] hover:underline">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}