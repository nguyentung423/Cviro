import { Users, Mic, Star, Headphones, TrendingUp, DollarSign, Clock, Award, ChevronRight, Briefcase } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    id: 1,
    name: "PG / PB",
    shortName: "PG/PB",
    description: "Nhân sự quảng bá thương hiệu tại booth, triển lãm, activation.",
    detailedDescription: "Tư vấn khách hàng, giới thiệu sản phẩm và tạo ấn tượng tích cực cho thương hiệu tại các sự kiện, triển lãm.",
    icon: <Users className="h-6 w-6" />,
    color: "#ab3f20",
    gradient: "from-[#ab3f20] to-[#8b2f15]",
    bgGradient: "from-[#ab3f20]/5 to-[#ab3f20]/10",
    salary: "400k - 800k",
    experience: "Không yêu cầu",
    demand: "Cao",
    skills: ["Giao tiếp tốt", "Ngoại hình khá", "Năng động", "Thân thiện"],
    opportunities: 45,
    growth: "+15%"
  },
  {
    id: 2,
    name: "Mascot",
    shortName: "Mascot",
    description: "Hoạt náo viên trong trang phục mascot, tạo sự chú ý cho sự kiện.",
    detailedDescription: "Hóa thân thành nhân vật mascot, tương tác với khách hàng và tạo không khí vui tươi cho sự kiện.",
    icon: <Star className="h-6 w-6" />,
    color: "#536b4e",
    gradient: "from-[#536b4e] to-[#3d5037]",
    bgGradient: "from-[#536b4e]/5 to-[#536b4e]/10",
    salary: "500k - 1M",
    experience: "6 tháng+",
    demand: "Trung bình",
    skills: ["Sức khỏe tốt", "Chiều cao phù hợp", "Hoạt bát", "Kiên nhẫn"],
    opportunities: 28,
    growth: "+8%"
  },
  {
    id: 3,
    name: "MC / Host",
    shortName: "MC",
    description: "Dẫn chương trình, kết nối khán giả và truyền tải thông điệp.",
    detailedDescription: "Điều khiển chương trình, tương tác với khán giả và đảm bảo sự kiện diễn ra suôn sẻ, cuốn hút.",
    icon: <Mic className="h-6 w-6" />,
    color: "#f0b33a",
    gradient: "from-[#f0b33a] to-[#d49520]",
    bgGradient: "from-[#f0b33a]/5 to-[#f0b33a]/10",
    salary: "800k - 2M",
    experience: "1-2 năm",
    demand: "Cao",
    skills: ["Kỹ năng thuyết trình", "Tự tin", "Nhanh trí", "Giọng nói hay"],
    opportunities: 32,
    growth: "+22%"
  },
  {
    id: 4,
    name: "Supervisor",
    shortName: "Supervisor",
    description: "Quản lý đội ngũ PG/PB, đảm bảo sự kiện vận hành trơn tru.",
    detailedDescription: "Giám sát và điều phối hoạt động của team, đảm bảo chất lượng dịch vụ và xử lý các tình huống phát sinh.",
    icon: <Headphones className="h-6 w-6" />,
    color: "#ab3f20",
    gradient: "from-[#ab3f20] to-[#8b2f15]",
    bgGradient: "from-[#ab3f20]/5 to-[#ab3f20]/10",
    salary: "1M - 2.5M",
    experience: "2+ năm",
    demand: "Cao",
    skills: ["Kỹ năng lãnh đạo", "Quản lý thời gian", "Giải quyết vấn đề", "Kinh nghiệm sự kiện"],
    opportunities: 18,
    growth: "+12%"
  },
];

const demandConfig = {
  "Cao": { color: "#e74c3c", bg: "bg-red-50", text: "text-red-700", icon: "🔥" },
  "Trung bình": { color: "#f39c12", bg: "bg-orange-50", text: "text-orange-700", icon: "⚡" },
  "Thấp": { color: "#27ae60", bg: "bg-green-50", text: "text-green-700", icon: "📊" }
};

export default function Roles() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-20" aria-label="Các vai trò nhân sự">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white shadow-lg">
            <Briefcase className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-3">
            Các vai trò nhân sự
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Cviro hỗ trợ đa dạng vị trí, phù hợp cho mọi sự kiện và nhu cầu tuyển dụng của doanh nghiệp
          </p>

          {/* Stats overview */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-6 rounded-xl bg-white px-6 py-3 shadow-md border border-[#e0e0e0]">
              <div className="flex items-center gap-2 text-[#ab3f20]">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm font-semibold">{roles.length} vị trí chính</span>
              </div>
              <div className="h-4 w-px bg-[#e0e0e0]"></div>
              <div className="flex items-center gap-2 text-[#666666]">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">
                  {roles.reduce((sum, role) => sum + role.opportunities, 0)}+ cơ hội việc làm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => {
            const demandStyle = demandConfig[role.demand];
            
            return (
              <div
                key={role.id}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-[#e0e0e0] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  hoveredCard === role.id ? "scale-[1.02]" : ""
                } ${selectedRole === role.id ? "ring-2 ring-[#ab3f20]/50" : ""}`}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.bgGradient} opacity-50`}></div>
                
                {/* Growth indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    <TrendingUp className="h-3 w-3" />
                    {role.growth}
                  </div>
                </div>

                <div className="relative p-6">
                  {/* Icon and title */}
                  <div className="mb-6">
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#ab3f20] transition-colors duration-200">
                      {role.name}
                    </h3>
                  </div>

                  {/* Key stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#ab3f20]" />
                        <span className="text-sm text-[#666666]">Lương/ngày</span>
                      </div>
                      <span className="text-sm font-bold text-[#1a1a1a]">{role.salary}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#ab3f20]" />
                        <span className="text-sm text-[#666666]">Kinh nghiệm</span>
                      </div>
                      <span className="text-sm font-medium text-[#1a1a1a]">{role.experience}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-[#ab3f20]" />
                        <span className="text-sm text-[#666666]">Nhu cầu</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${demandStyle.bg} ${demandStyle.text}`}>
                        <span>{demandStyle.icon}</span>
                        {role.demand}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                    {selectedRole === role.id ? role.detailedDescription : role.description}
                  </p>

                  {/* Opportunities counter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#666666]">Cơ hội hiện tại</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-bold text-[#ab3f20]">{role.opportunities}+ việc</span>
                    </div>
                  </div>

                  {/* Skills preview or detailed view */}
                  {selectedRole === role.id ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a1a] mb-2">Kỹ năng yêu cầu:</h4>
                        <div className="flex flex-wrap gap-1">
                          {role.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-block rounded-md bg-[#f8f9fa] px-2 py-1 text-xs text-[#666666] border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        className={`w-full rounded-xl bg-gradient-to-r ${role.gradient} px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95`}
                        aria-label={`Xem việc làm ${role.name}`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Xem {role.opportunities}+ việc làm
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="group/button w-full rounded-xl border-2 border-[#e0e0e0] bg-white px-4 py-2 text-sm font-semibold text-[#666666] transition-all duration-200 hover:border-[#ab3f20] hover:text-[#ab3f20] hover:bg-[#ab3f20]/5"
                      aria-label={`Xem chi tiết ${role.name}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Xem chi tiết
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-16">
          <div className="rounded-3xl bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] p-8 text-white shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">Không tìm thấy vị trí phù hợp?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Chúng tôi có nhiều vị trí khác đang cập nhật. Để lại thông tin để được tư vấn về cơ hội việc làm phù hợp nhất với bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#ab3f20] shadow-lg hover:bg-gray-50 transition-all duration-200">
                  Tư vấn miễn phí
                </button>
                <button className="rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all duration-200">
                  Xem tất cả vị trí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}