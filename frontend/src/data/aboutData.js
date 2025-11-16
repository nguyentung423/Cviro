import { 
  Users, Target, Heart, HandHeart, Rocket, Lightbulb, Sprout,
  Award, Zap, Star
} from 'lucide-react';

export const aboutData = {
  hero: {
    title: "Kết nối nhân sự sự kiện với",
    titleHighlight: "các agency uy tín",
    subtitle: "Nhanh chóng • Minh bạch • Hiệu quả",
    description:
      "Cviro là nền tảng tuyển dụng chuyên biệt cho ngành Event, nơi PG, PB, MC, Sup và nhân sự sự kiện dễ dàng kết nối với hàng trăm agency hàng đầu – nhanh gọn, rõ ràng và đáng tin cậy.",
    achievements: ["Kết nối 5,000+ job", "Hơn 300 agency", "12,000+ ứng viên"]
  },

  realTimeStats: [
    { number: "5000", label: "Ca làm đã đăng", icon: Target, trend: "+12%", live: true },
    { number: "300", label: "Agency tin dùng", icon: Users, trend: "+8%", live: true },
    { number: "12000", label: "Ứng viên tham gia", icon: Heart, trend: "+23%", live: true },
  ],

  achievements: [
    { 
      title: "Swinburne Startup Awards 2025", 
      org: "Top Finalist - HR Tech Innovation", 
      icon: Award 
    },
    { 
      title: "UniVentures 2025 Startup Program", 
      org: "Selected Participant - BLOCK71 Vietnam", 
      icon: Rocket 
    },
    { 
      title: "Phenikaa Startup Competition 2025", 
      org: "Investment Round Finalist", 
      icon: Star 
    },
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
        position: "AI Developer",
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
        position: "Business Development Manager",
        image: "/khang.png",
        bio: "Đại học Kinh Tế Quốc Dân",
        skills: ["Business Strategy", "Partnership", "Market Analysis"],
        linkedin: "https://www.facebook.com/hai.yen.206178/",
        status: "online"
      },
      {
        name: "Phạm Quang Minh",
        position: "Back-End Developer",
        image: "/m.jpg",
        bio: "Đại học Phenikaa",
        skills: ["Node.js", "REST API", "MongoDB"],
        linkedin: "#",
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
      company: "Galaxy Events",
      rating: 5
    },
    {
      quote:
        "Nhờ Cviro, chúng tôi tìm được đúng nhân sự cho các activation lớn chỉ trong vài phút.",
      author: "Tố Nguyên",
      position: "CEO, Premium Productions",
      company: "Premium Productions",
      rating: 5
    }
  ]
};
