export interface Agency {
  id: string;
  email: string;
  name: string | null;
  agency_name: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  agency_id: string;
  title: string;
  description: string | null;
  location: string;
  pay: string | null;
  salary: string | null;
  start_time: string; // ISO date string
  end_time: string | null;
  date: string; // For event date
  published: boolean;
  created_at: string;
  updated_at: string;
  agency?: {
    name: string | null;
    agency_name: string | null;
    avatar_url: string | null;
    bio: string | null;
  };
}

export interface JobFormData {
  title: string;
  description: string;
  location: string;
  salary: string;
  date: string;
}

export interface AgencyStats {
  totalJobs: number;
  jobsThisWeek: number;
  activeJobs: number;
  totalApplications: number;
}

// Danh sách quận Hà Nội
export const HANOI_DISTRICTS = [
  "Ba Đình",
  "Hoàn Kiếm",
  "Đống Đa",
  "Hai Bà Trưng",
  "Hoàng Mai",
  "Thanh Xuân",
  "Long Biên",
  "Nam Từ Liêm",
  "Bắc Từ Liêm",
  "Tây Hồ",
  "Cầu Giấy",
  "Hà Đông",
] as const;

export type HanoiDistrict = (typeof HANOI_DISTRICTS)[number];
