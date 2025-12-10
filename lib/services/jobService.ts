import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Job, Application, JobWithApplication } from "@/types/candidate";

export class JobService {
  /**
   * Get all published jobs
   */
  static async getAllJobs(): Promise<Job[]> {
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select(
        `
        *,
        agency:agencies (
          name,
          agency_name
        )
      `
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get all jobs error:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Get job by ID
   */
  static async getJobById(jobId: string): Promise<Job | null> {
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select(
        `
        *,
        agency:agencies (
          name,
          agency_name,
          avatar_url,
          bio
        )
      `
      )
      .eq("id", jobId)
      .maybeSingle();

    if (error) {
      console.error("Get job by ID error:", error);
      return null;
    }

    return data;
  }

  /**
   * Get jobs that candidate has applied to
   */
  static async getJobsCandidateApplied(
    candidateId: string
  ): Promise<JobWithApplication[]> {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select(
        `
        id,
        status,
        created_at,
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
      .eq("candidate_id", candidateId);

    if (error) {
      console.error("Get applied jobs error:", error);
      return [];
    }

    return (
      (
        data as unknown as Array<{
          id: string;
          status: "pending" | "approved" | "rejected" | "withdrawn";
          created_at: string;
          job: Job;
        }>
      )
        ?.map((app) => ({
          ...app.job,
          application: {
            id: app.id,
            status: app.status,
            created_at: app.created_at,
          },
        }))
        .filter(Boolean) || []
    );
  }

  /**
   * Apply for a job
   */
  static async applyJob(
    candidateId: string,
    jobId: string,
    message?: string
  ): Promise<Application | null> {
    // Check if already applied
    const { data: existing } = await supabaseAdmin
      .from("applications")
      .select("id")
      .eq("candidate_id", candidateId)
      .eq("job_id", jobId)
      .maybeSingle();

    if (existing) {
      console.error("Already applied to this job");
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from("applications")
      .insert({
        candidate_id: candidateId,
        job_id: jobId,
        message: message || null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Apply job error:", error);
      return null;
    }

    return data;
  }

  /**
   * Withdraw application
   */
  static async withdrawApplication(applicationId: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from("applications")
      .update({
        status: "withdrawn",
        updated_at: new Date().toISOString(),
      })
      .eq("id", applicationId);

    if (error) {
      console.error("Withdraw application error:", error);
      return false;
    }

    return true;
  }

  /**
   * Get available jobs (not applied yet)
   */
  static async getAvailableJobs(candidateId: string): Promise<Job[]> {
    // Get all job IDs that candidate has applied to
    const appliedJobIds = await this.getJobsCandidateApplied(candidateId);

    // Get all published jobs
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select(
        `
        *,
        agency:agencies (
          name,
          agency_name
        )
      `
      )
      .eq("published", true)
      .not("id", "in", `(${appliedJobIds.join(",")})`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get available jobs error:", error);
      return [];
    }

    return data || [];
  }
}
