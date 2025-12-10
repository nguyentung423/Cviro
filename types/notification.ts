export interface Notification {
  id: string;
  candidate_id: string;
  application_id: string;
  type: "application_approved" | "application_rejected";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  job?: {
    id: string;
    title: string;
    location: string | null;
  };
  agency?: {
    phone: string | null;
    agency_name: string | null;
  };
}
