export const mockCandidate = {
  id: "cand-001",
  fullName: "Nguyễn Văn A",
  role: "PG / PB",
  email: "nguyenvana@example.com",
  phone: "0966 123 456",
  location: "Hà Nội, Việt Nam",
  bio: "5 năm kinh nghiệm hỗ trợ sự kiện, mạnh về giao tiếp và chăm sóc khách tham dự. Luôn ưu tiên đúng giờ và tác phong chuyên nghiệp.",
  skills: ["Giao tiếp", "MC cơ bản", "Tư vấn sản phẩm", "Tiếng Anh B2"].join(", "),
  avatarUrl: "/khang.png",
  portfolio: ["/pg.png", "/nhat.png", "/m.jpg"],
};

export const mockCandidateStats = {
  totalApplications: 18,
  underReview: 4,
  accepted: 11,
  rejected: 3,
};

export const mockCandidateApplications = [
  {
    id: "APP-001",
    jobTitle: "PG Booth - Tech Expo 2025",
    createdAt: "2025-09-08",
    status: "accepted",
  },
  {
    id: "APP-002",
    jobTitle: "Mascot Food & Drink Festival",
    createdAt: "2025-09-10",
    status: "pending",
  },
  {
    id: "APP-003",
    jobTitle: "Sampling - Roadshow Vincom",
    createdAt: "2025-09-04",
    status: "rejected",
  },
];

export const mockCandidateJobs = [
  {
    id: "JOB-001",
    title: "PG Booth - Tech Expo",
    description: "Tư vấn khách tham quan, hỗ trợ phát voucher cho khu công nghệ.",
    location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
    salary: "800.000đ / ca",
    deadline: "20/09/2025",
  },
  {
    id: "JOB-002",
    title: "MC sự kiện xe hơi",
    description: "Dẫn chương trình khai mạc, giới thiệu khách mời cho hãng xe Nhật.",
    location: "SECC, TP.HCM",
    salary: "1.500.000đ / ca",
    deadline: "18/09/2025",
  },
  {
    id: "JOB-003",
    title: "Sampling cafe cold brew",
    description: "Phát mẫu dùng thử tại hệ thống Vincom trong 3 ngày cuối tuần.",
    location: "Vincom Bà Triệu, Hà Nội",
    salary: "550.000đ / ca",
    deadline: "15/09/2025",
  },
];

export const mockAgencyProfile = {
  id: "agency-001",
  companyName: "Crewnect Agency",
  companyType: "Event & Activation",
  website: "https://crewnect.vn",
  address: "22 Ngô Quyền, Q. Hoàn Kiếm, Hà Nội",
  contactPerson: "Trần Thảo",
  phone: "0877 888 999",
  email: "agency@crewnect.vn",
};

export const mockAgencyJobs = [
  {
    id: "AG-JOB-001",
    title: "PG Booth - Tech Expo",
    company_name: "Crewnect Agency",
    status: "Đang tuyển",
    urgency: "high",
    location: "Hà Nội",
    salary: "800.000đ / ca",
    deadline: "20/09/2025",
    created_at: "2025-09-05T08:00:00Z",
    applicants: 18,
    requirements: ["Ngoại hình sáng", "Tiếng Anh giao tiếp", "Đi làm đủ 3 ngày"],
    featured: true,
  },
  {
    id: "AG-JOB-002",
    title: "MC Event ra mắt xe",
    company_name: "Crewnect Agency",
    status: "Chờ duyệt",
    urgency: "medium",
    location: "TP.HCM",
    salary: "1.500.000đ / ca",
    deadline: "18/09/2025",
    created_at: "2025-09-03T08:00:00Z",
    applicants: 6,
    requirements: ["Giọng nói chuẩn", "Kinh nghiệm 2 năm"],
    featured: false,
  },
  {
    id: "AG-JOB-003",
    title: "Sampling Roadshow",
    company_name: "Crewnect Agency",
    status: "Đã đăng",
    urgency: "low",
    location: "Đà Nẵng",
    salary: "500.000đ / ca",
    deadline: "25/09/2025",
    created_at: "2025-09-01T08:00:00Z",
    applicants: 24,
    requirements: ["Có xe máy", "Năng động", "Làm cuối tuần"],
    featured: false,
  },
];

export const mockAgencyApplications = [
  {
    id: "AG-APP-001",
    candidateName: "Nguyễn Lệ Quyên",
    jobTitle: "PG Booth - Tech Expo",
    createdAt: "2025-09-08",
    status: "pending",
  },
  {
    id: "AG-APP-002",
    candidateName: "Phạm Hoàng Tuấn",
    jobTitle: "MC Event ra mắt xe",
    createdAt: "2025-09-07",
    status: "accepted",
  },
  {
    id: "AG-APP-003",
    candidateName: "Vũ Minh Đức",
    jobTitle: "Sampling Roadshow",
    createdAt: "2025-09-06",
    status: "rejected",
  },
];

export const mockAgencyNotifications = [
  { id: "NTF-001", message: "5 ứng viên mới cho job PG Booth" },
  { id: "NTF-002", message: "Job MC Event chờ duyệt thông tin" },
];
