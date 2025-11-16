import { useState } from 'react';
import { ArrowRight, Users, Briefcase, CheckCircle, Star, Clock, Shield } from 'lucide-react';
import { useIsMobile } from "../../hooks/useIsMobile";

const benefits = [
  {
    icon: Clock,
    title: "Nhanh chóng",
    description: "Tìm việc chỉ trong 3 phút"
  },
  {
    icon: Shield,
    title: "Tin cậy",
    description: "Thanh toán minh bạch 100%"
  },
  {
    icon: Star,
    title: "Chất lượng",
    description: "4.9/5 sao từ người dùng"
  }
];

const stats = [
  { number: "5000+", label: "Nhân sự hoạt động" },
  { number: "200+", label: "Sự kiện mỗi tháng" },
  { number: "98%", label: "Tỷ lệ hài lòng" }
];

const UserTypeCard = ({ icon: Icon, title, description, benefits, buttonText, buttonStyle, isPopular }) => (
  <div className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:bg-white/20 hover:scale-105 flex flex-col ${
    isPopular ? 'border-white border-2 shadow-2xl' : 'border-white/30'
  }`}>
    {isPopular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="bg-[#f0b33a] text-white px-4 py-1 rounded-full text-xs font-bold">
          PHỔ BIẾN NHẤT
        </span>
      </div>
    )}
    
    <div className="text-center mb-6">
      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
    
    <div className="space-y-3 mb-6 flex-grow">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3 text-white/90">
          <CheckCircle className="w-5 h-5 text-[#f0b33a] flex-shrink-0 mt-0.5" />
          <span className="text-sm">{benefit}</span>
        </div>
      ))}
    </div>
    
    <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${buttonStyle}`}>
      {buttonText}
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export default function Cta() {
  const [activeTab, setActiveTab] = useState('all');
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ab3f20] via-[#ab3f20] to-[#536b4e] py-12 md:py-20">
      {/* Animated background elements - disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f0b33a]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#536b4e]/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      )}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header - mobile optimized */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Sẵn sàng{' '}
            <span className="bg-gradient-to-r from-[#f0b33a] to-white bg-clip-text text-transparent">
              thay đổi cuộc chơi?
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8">
            Tham gia Cviro - nền tảng kết nối nhân sự sự kiện hàng đầu Việt Nam
          </p>
          
          {/* Quick stats - mobile friendly */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[#f0b33a]">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits - mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/80 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* User type cards - mobile-first */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12 px-4">
          <UserTypeCard
            icon={Users}
            title="Dành cho Nhân sự"
            description="Tìm việc part-time linh hoạt trong lĩnh vực sự kiện"
            benefits={[
              "Tìm việc nhanh chóng chỉ trong 3 phút",
              "Thanh toán minh bạch, đúng hẹn",
              "Flexible working time phù hợp lịch học",
              "Cơ hội networking và phát triển kỹ năng"
            ]}
            buttonText="Tìm việc ngay"
            buttonStyle="bg-white text-[#ab3f20] hover:bg-white/90 shadow-lg hover:shadow-xl"
            isPopular={true}
          />
          
          <UserTypeCard
            icon={Briefcase}
            title="Dành cho Doanh nghiệp"
            description="Tìm nhân sự chất lượng cho sự kiện của bạn"
            benefits={[
              "Database nhân sự rộng lớn và đa dạng",
              "Quản lý nhân sự thông minh và hiệu quả",
              "Tiết kiệm 70% thời gian tuyển dụng",
              "Hỗ trợ 24/7 từ team chuyên nghiệp"
            ]}
            buttonText="Đăng tuyển ngay"
            buttonStyle="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#ab3f20]"
          />
        </div>

        {/* Final CTA - mobile optimized */}
        <div className="text-center px-4">
          <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30">
            <div className="text-center md:text-left">
              <p className="text-white font-medium mb-1">Bắt đầu ngay hôm nay</p>
              <p className="text-white/70 text-sm">Miễn phí đăng ký • Không ràng buộc</p>
            </div>
            <button className="bg-[#f0b33a] text-white px-6 md:px-8 py-3 rounded-xl font-semibold hover:bg-[#f0b33a]/90 transition-all duration-300 flex items-center gap-2 whitespace-nowrap will-change-transform">
              Tham gia ngay
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}