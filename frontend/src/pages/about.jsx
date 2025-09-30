import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronDown, Users, Target, Heart, Lightbulb, Rocket, HandHeart, Sprout,
  Play, Pause, Volume2, VolumeX, Globe, Award, Zap, Star, ArrowRight,
  Sparkles, Eye, TrendingUp, Shield, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';

// Enhanced Data Configuration
const aboutData = {
  hero: {
    title: "Kết nối nhân sự sự kiện với",
    titleHighlight: "các agency uy tín",
    subtitle: "Nhanh chóng • Minh bạch • Hiệu quả",
    description:
      "Cviro là nền tảng tuyển dụng chuyên biệt cho ngành Event, nơi PG, PB, MC, Sup và nhân sự sự kiện dễ dàng kết nối với hàng trăm agency hàng đầu – nhanh gọn, rõ ràng và đáng tin cậy.",
    videoUrl: "/videos/hero-video.mp4",
    achievements: ["Kết nối 5,000+ job", "Hơn 300 agency", "12,000+ ứng viên"]
  },

  realTimeStats: [
    { number: "5000", label: "Ca làm đã đăng", icon: Target, trend: "+12%", live: true },
    { number: "300", label: "Agency tin dùng", icon: Users, trend: "+8%", live: true },
    { number: "12000", label: "Ứng viên tham gia", icon: Heart, trend: "+23%", live: true },
  ],

  achievements: [
    { title: "Nền tảng sự kiện hàng đầu", org: "Event Awards 2024", icon: Award },
    { title: "Giải pháp tuyển dụng sáng tạo", org: "Tech Summit", icon: Zap },
    { title: "Được tin dùng bởi", org: "HR Excellence", icon: Star },
  ],

  mission: {
    title: "Sứ mệnh",
    mainTitle: "Kết nối nhân sự,",
    mainTitleHighlight: "nâng tầm sự kiện",
    description:
      "Mỗi sự kiện đều cần nhân sự phù hợp. Cviro giúp agency tìm đúng người – đúng việc, đồng thời tạo ra cơ hội việc làm minh bạch, an toàn cho ứng viên.",
    quote:
      "Sứ mệnh của chúng tôi là trở thành cầu nối tin cậy, phát triển cộng đồng nhân sự sự kiện chuyên nghiệp tại Việt Nam và vươn tầm khu vực.",
    founder: {
      name: "Nguyễn Hoàng Tùng",
      position: "Founder",
      image: "/t.jpg",
      linkedin: "https://linkedin.com/in/tungnguyenhoang",
      credentials: "Trường Đại học Công Nghệ - ĐHQGHN"
    },
    metrics: [
      { label: "Tỷ lệ matching thành công", value: "98.5%" },
      { label: "Thời gian kết nối", value: "< 2 phút" },
      { label: "Độ hài lòng", value: "4.9/5" }
    ]
  },

  values: {
    title: "Giá trị cốt lõi",
    mainTitle: "Đội ngũ trẻ trung,",
    mainTitleHighlight: "nhiệt huyết & tận tâm",
    description:
      "Chúng tôi là tập thể trẻ trung, am hiểu ngành Event, luôn đổi mới để mang lại trải nghiệm tốt nhất cho cả ứng viên và agency.",
    items: [
      {
        title: "Tận tâm",
        description:
          "Cam kết mang đến trải nghiệm minh bạch, hỗ trợ ứng viên và agency mọi lúc.",
        icon: HandHeart,
        color: "from-orange-700 to-orange-600",
        metrics: "Hỗ trợ 24/7"
      },
      {
        title: "Phát triển",
        description:
          "Không ngừng cải tiến nền tảng, giúp ứng viên có thêm nhiều cơ hội việc làm.",
        icon: Rocket,
        color: "from-orange-600 to-orange-500",
        metrics: "5,000+ job"
      },
      {
        title: "Đổi mới",
        description:
          "Ứng dụng công nghệ hiện đại để đơn giản hóa tuyển dụng sự kiện.",
        icon: Lightbulb,
        color: "from-green-700 to-green-600",
        metrics: "Smart Matching"
      },
      {
        title: "Hợp tác",
        description:
          "Xây dựng cộng đồng gắn kết giữa nhân sự và agency, phát triển bền vững.",
        icon: Sprout,
        color: "from-green-600 to-green-500",
        metrics: "Community"
      },
    ],
  },

  team: {
    title: "Đội ngũ",
    mainTitle: "Trải nghiệm chuyên nghiệp cùng",
    mainTitleHighlight: "đội ngũ Cviro",
    description:
      "Cviro được xây dựng bởi những người trẻ am hiểu ngành Event & Công nghệ. Chúng tôi luôn sẵn sàng đồng hành để mang lại trải nghiệm tuyển dụng tốt nhất.",
    members: [
      {
        name: "Nguyễn Kim Thư",
        position: "Brand Manager",
        image: "/th.png",
        bio: "Trường Đại học Giáo Dục - ĐHQGHN",
        skills: ["Brand Strategy", "Digital Marketing", "UX/UI"],
        linkedin: "https://www.facebook.com/nguyen.thu.367533",
        status: "online"
      },
      {
        name: "Bảo Nhật",
        position: "AI Engineer",
        image: "/nhat.png",
        bio: "Trường Đại học Văn Lang",
        skills: ["Machine Learning", "Deep Learning", "Python"],
        linkedin: "https://www.linkedin.com/in/chrisnguyenx05/",
        status: "online"
      },
      {
        name: "Võ Thành Nhân",
        position: "Finance Manager",
        image: "/n.png",
        bio: "Đại học Kinh Tế TP.HCM",
        skills: ["Financial Analysis", "Investment", "Strategy"],
        linkedin: "https://www.facebook.com/profile.php?id=100041105261085&mibextid=ZbWKwL",
        status: "online"
      },
      {
        name: "Hà Hải Yến",
        position: "BD Manager",
        image: "/khang.png",
        bio: "Đại học Kinh Tế Quốc Dân",
        skills: ["Business Strategy", "Partnership", "Market Analysis"],
        linkedin: "https://www.facebook.com/hai.yen.206178/",
        status: "online"
      },
      {
        name: "Trần Minh Khoa",
        position: "Tech Lead",
        image: "/khoa.png",
        bio: "Trường Đại học Bách Khoa HN",
        skills: ["Full-stack Dev", "System Design", "Cloud Architecture"],
        linkedin: "https://linkedin.com/in/tranminhkhoa",
        status: "online"
      },
      {
        name: "Lê Thị Mai",
        position: "HR Specialist",
        image: "/mai.png",
        bio: "Đại học Ngoại Thương",
        skills: ["Talent Acquisition", "Employee Relations", "HR Analytics"],
        linkedin: "https://linkedin.com/in/lethimai",
        status: "online"
      },
    ],
  },

  testimonials: [
    {
      quote:
        "Cviro đã giúp chúng tôi tuyển dụng PG/PB nhanh chóng, minh bạch và cực kỳ tiện lợi.",
      author: "Nguyễn Thắng",
      position: "Event Director, Shine Invest",
      avatar: "/images/testimonial-1.jpg",
      company: "Galaxy Events",
      rating: 5
    },
    {
      quote:
        "Nhờ Cviro, chúng tôi tìm được đúng nhân sự cho các activation lớn chỉ trong vài phút.",
      author: "Tố Nguyên",
      position: "CEO, Premium Productions",
      avatar: "/images/testimonial-2.jpg",
      company: "Premium Productions",
      rating: 5
    }
  ]
};

// Advanced Hooks
const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { scrollY, windowHeight };
};

const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!shouldStart || isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [shouldStart, end, duration, isAnimating]);

  return count;
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, isVisible];
};

// Floating Elements Component
const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `}</style>
  </div>
);

// Video Player Component
const VideoPlayer = ({ videoUrl, className = "" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-4 text-white">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={togglePlay}
          className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </button>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = ({ hero }) => {
  const { scrollY } = useParallax();
  const [ref, isVisible] = useIntersectionObserver();
  const [currentAchievement, setCurrentAchievement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievement(prev => (prev + 1) % hero.achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hero.achievements.length]);

  return (
    <>
      <FloatingElements />
      
      <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-green-600/10"></div>
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(194,108,65,0.1)_0%,transparent_50%)] transform"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {hero.achievements[currentAchievement]}
            </span>
          </div>

          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 leading-none tracking-tight">
              {hero.title}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-green-700 bg-clip-text text-transparent">
                  {hero.titleHighlight}
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-orange-700 font-semibold mb-8 tracking-wide">
              {hero.subtitle}
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
              {hero.description}
            </p>
          </div>

          <div className={`flex flex-col md:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <button className="group relative px-12 py-6 bg-gradient-to-r from-orange-700 to-orange-600 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-600/25">
              <span className="relative z-10 flex items-center gap-3">
                Khám phá ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-8 py-6 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-2xl hover:border-orange-600 hover:text-orange-700 transition-all duration-300 backdrop-blur-md bg-white/80">
              <Play className="w-5 h-5 inline mr-2" />
              Xem demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Real Time Stats Section
const RealTimeStatsSection = ({ stats }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-gray-50 to-stone-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thống kê <span className="text-orange-700">Real-time</span>
          </h2>
          <p className="text-xl text-gray-600">Dữ liệu cập nhật trực tiếp từ hệ thống</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const number = parseInt(stat.number);
            const count = useCountUp(number, 2500, isVisible);
            const Icon = stat.icon;
            
            return (
              <div 
                key={index}
                className={`relative group transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">LIVE</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}
                    </div>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                    {isVisible ? `${count.toLocaleString()}+` : '0'}
                  </div>

                  <p className="text-lg font-medium text-gray-600">{stat.label}</p>

                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-600 to-orange-700 rounded-full transition-all duration-2000"
                      style={{ width: isVisible ? `${75 + index * 10}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Achievements Section
const AchievementsSection = ({ achievements }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thành tựu & <span className="bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent">Chứng nhận</span>
          </h2>
          <p className="text-xl text-gray-600">Được công nhận bởi các tổ chức uy tín</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`group text-center transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-orange-700 font-medium">{achievement.org}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Interactive Video Section
const InteractiveVideoSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div ref={ref} className="py-24 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Trải nghiệm <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">tương lai</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá công nghệ AI tiên tiến đang cách mạng hóa ngành sự kiện
          </p>
        </div>
        
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <VideoPlayer 
              videoUrl="/videos/platform-demo.mp4" 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Mission Section
const EnhancedMissionSection = ({ mission }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold text-sm rounded-full mb-8">
              <Globe className="w-4 h-4" />
              {mission.title}
            </div>
            
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              {mission.mainTitle}{' '}
              <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-green-700 bg-clip-text text-transparent">
                {mission.mainTitleHighlight}
              </span>
            </h3>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{mission.description}</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {mission.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-orange-700 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}>
            <div className="relative">
              <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-gray-200 shadow-2xl">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">"</span>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed font-medium mb-10 italic">
                  {mission.quote}
                </p>
                
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={mission.founder.image}
                        alt={mission.founder.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-white text-3xl font-bold">T</div>';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <h4 className="text-2xl font-bold text-gray-900">{mission.founder.name}</h4>
                    <p className="text-orange-700 font-semibold text-lg">{mission.founder.position}</p>
                    <p className="text-gray-500 text-sm">{mission.founder.credentials}</p>
                    
                    <div className="flex items-center mt-2 gap-2">
                      <a href={mission.founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:text-orange-800 transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                      <span className="text-green-700 text-xs font-medium">Verified Leader</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Advanced Values Section
const AdvancedValuesSection = ({ values }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div ref={ref} className="py-24 bg-gradient-to-br from-stone-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-sm rounded-full mb-8">
              <Zap className="w-4 h-4" />
              {values.title}
            </div>
            
            <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              {values.mainTitle}{' '}
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-orange-700 bg-clip-text text-transparent">
                {values.mainTitleHighlight}
              </span>
            </h3>
            
            <p className="text-xl text-gray-600 leading-relaxed">{values.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="absolute top-4 right-4">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200" />
                      <circle 
                        cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none"
                        className={`text-orange-600 transition-all duration-1000`}
                        style={{ 
                          strokeDasharray: '75.4', 
                          strokeDashoffset: hoveredCard === index ? '0' : '75.4',
                          transition: 'stroke-dashoffset 1s ease-in-out'
                        }}
                      />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="font-black text-xl text-gray-900 mb-4">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{item.description}</p>
                    
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      <Zap className="w-3 h-3" />
                      {item.metrics}
                    </div>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform origin-left transition-transform duration-500 ${
                    hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Team Section with Infinite Carousel
const PremiumTeamSection = ({ team }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Tạo mảng members lặp lại để tạo hiệu ứng infinite loop
  const extendedMembers = [...team.members, ...team.members, ...team.members];

  useEffect(() => {
    if (!isVisible || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  // Reset về vị trí đầu khi đến cuối để tạo loop vô hạn
  useEffect(() => {
    if (currentIndex >= team.members.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700);
    }
  }, [currentIndex, team.members.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(team.members.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(team.members.length - 1);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div ref={ref} className="py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-sm rounded-full mb-8">
            <Users className="w-4 h-4" />
            {team.title}
          </div>
          
          <h3 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            {team.mainTitle}{' '}
            <span className="bg-gradient-to-r from-green-700 via-green-600 to-orange-700 bg-clip-text text-transparent">
              {team.mainTitleHighlight}
            </span>
          </h3>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {team.description}
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex justify-center mb-8 gap-2">
            {team.members.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === (currentIndex % team.members.length)
                    ? 'w-8 bg-gradient-to-r from-orange-600 to-orange-700' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {extendedMembers.map((member, index) => (
                <div 
                  key={`${member.name}-${index}`}
                  className="flex-shrink-0 px-4"
                  style={{ width: '33.333%' }}
                >
                  <div className="group relative transform transition-all duration-500 hover:scale-105">
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                      <div className="relative h-80 overflow-hidden flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-orange-600 to-green-600 flex items-center justify-center text-white text-6xl font-bold">${member.name.charAt(0)}</div>`;
                          }}
                        />
                        
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                          <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-600 animate-pulse' : 'bg-orange-600'}`}></div>
                          <span className="text-xs font-medium text-gray-700 capitalize">{member.status}</span>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {member.skills.slice(0, 2).map((skill, skillIndex) => (
                                <span key={skillIndex} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm text-white font-medium text-sm rounded-full hover:bg-white/30 transition-colors">
                              <Globe className="w-3 h-3" />
                              Connect
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                        <p className="text-lg font-semibold text-orange-700 mb-3">{member.position}</p>
                        <p className="text-gray-600 leading-relaxed text-sm flex-grow">{member.bio}</p>
                        
                        <button 
                          onClick={() => setSelectedMember(selectedMember === index ? null : index)}
                          className="mt-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium text-sm rounded-xl hover:shadow-lg transition-all duration-300 w-full justify-center"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedMember === index ? 'Ẩn' : 'Xem thêm'}
                        </button>
                        
                        <div className={`mt-4 overflow-hidden transition-all duration-500 ${
                          selectedMember === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="p-4 bg-stone-50 rounded-xl">
                            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Kỹ năng chính:</h5>
                            <div className="flex flex-wrap gap-1">
                              {member.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-lg">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-600 to-transparent opacity-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = ({ testimonials }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div ref={ref} className="py-24 bg-gradient-to-r from-stone-50 via-gray-50 to-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Khách hàng <span className="text-orange-700">nói gì</span>
          </h2>
        </div>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 ${
                index === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-gray-200">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-orange-600 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <span className="text-white font-bold text-xl">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-orange-700 font-medium">{testimonial.position}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AboutPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const criticalImages = [
      '/t.jpg',
      '/th.png', 
      '/nhat.png',
      '/n.png',
      '/khang.png',
      '/khoa.png',
      '/mai.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <HeroSection hero={aboutData.hero} />
      <RealTimeStatsSection stats={aboutData.realTimeStats} />
      <AchievementsSection achievements={aboutData.achievements} />
      <InteractiveVideoSection />
      <EnhancedMissionSection mission={aboutData.mission} />
      <AdvancedValuesSection values={aboutData.values} />
      <PremiumTeamSection team={aboutData.team} />
      <TestimonialsSection testimonials={aboutData.testimonials} />
    </div>
  );
}