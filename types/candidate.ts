export interface Candidate {
  id: string;
  email: string;
  name: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  phone: string | null;
  zalo: string | null;
  avatar_url: string | null;
  photo_1: string | null;
  photo_2: string | null;
  photo_3: string | null;
  photo_4: string | null;
  experience: string | null;
  banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  agency_id: string;
  title: string;
  description: string | null;
  location: string | null;
  pay: string | null;
  start_time: string | null;
  end_time: string | null;
  slots: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  agency?: {
    name: string | null;
    agency_name: string | null;
    phone: string | null;
  };
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: "pending" | "approved" | "rejected" | "withdrawn";
  note: string | null;
  message: string | null;
  created_at: string;
  updated_at: string;
  job?: Job;
}

export interface JobWithApplication extends Job {
  application?: {
    id: string;
    status: "pending" | "approved" | "rejected" | "withdrawn";
    created_at: string;
  };
}

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface ProfileUpdateData {
  name?: string;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  phone?: string;
  zalo?: string;
  experience?: string;
  avatar_url?: string;
  photo_1?: string;
  photo_2?: string;
  photo_3?: string;
  photo_4?: string;
}
