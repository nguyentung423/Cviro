import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type {
  Candidate,
  ProfileUpdateData,
  Application,
  ApplicationStats,
} from "@/types/candidate";

export class CandidateService {
  /**
   * Get candidate profile by email
   */
  static async getProfile(email: string): Promise<Candidate | null> {
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Get profile error:", error);
      return null;
    }

    return data;
  }

  /**
   * Get candidate profile by ID
   */
  static async getProfileById(id: string): Promise<Candidate | null> {
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Get profile by ID error:", error);
      return null;
    }

    return data;
  }

  /**
   * Update candidate profile
   */
  static async updateProfile(
    email: string,
    updates: ProfileUpdateData
  ): Promise<Candidate | null> {
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email.trim().toLowerCase())
      .select()
      .single();

    if (error) {
      console.error("Update profile error:", error);
      return null;
    }

    return data;
  }

  /**
   * Get candidate applications with job details
   */
  static async getApplications(candidateId: string): Promise<Application[]> {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select(
        `
        *,
        job:jobs (
          *,
          agency:agencies (
            name,
            agency_name
          )
        )
      `
      )
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get applications error:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Get application statistics
   */
  static async getApplicationStats(
    candidateId: string
  ): Promise<ApplicationStats> {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("status")
      .eq("candidate_id", candidateId);

    if (error || !data) {
      return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }

    const stats = data.reduce(
      (acc, app) => {
        acc.total++;
        if (app.status === "pending") acc.pending++;
        if (app.status === "approved") acc.approved++;
        if (app.status === "rejected") acc.rejected++;
        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    );

    return stats;
  }

  /**
   * Get recent applications (last 5)
   */
  static async getRecentApplications(
    candidateId: string
  ): Promise<Application[]> {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select(
        `
        *,
        job:jobs (
          *,
          agency:agencies (
            name,
            agency_name,
            phone
          )
        )
      `
      )
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Get recent applications error:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Upload avatar URL (just update the field)
   */
  static async uploadAvatar(
    email: string,
    avatarUrl: string
  ): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from("candidates")
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email.trim().toLowerCase());

    if (error) {
      console.error("Upload avatar error:", error);
      return false;
    }

    return true;
  }

  /**
   * Upload photo URL to specific slot (photo_1, photo_2, photo_3, photo_4)
   */
  static async uploadPhoto(
    email: string,
    photoSlot: "photo_1" | "photo_2" | "photo_3" | "photo_4",
    photoUrl: string
  ): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from("candidates")
      .update({
        [photoSlot]: photoUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email.trim().toLowerCase());

    if (error) {
      console.error("Upload photo error:", error);
      return false;
    }

    return true;
  }
}
