import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Job, JobFormData, AgencyStats } from "@/types/agency";

export class AgencyJobService {
  /**
   * Create a new job
   */
  static async createJob(
    agencyId: string,
    data: Partial<JobFormData>
  ): Promise<Job | null> {
    try {
      // Auto-generate title from location
      const title = `Tuyển nhân sự - ${data.location}`;
      // Use current date as default
      const currentDate = new Date().toISOString();

      const { data: job, error } = await supabaseAdmin
        .from("jobs")
        .insert({
          agency_id: agencyId,
          title: title,
          description: data.description || "",
          location: data.location || "",
          start_time: currentDate,
          published: true,
        })
        .select()
        .single();

      if (error) {
        console.error("Create job error:", error);
        return null;
      }

      return job;
    } catch (error) {
      console.error("Create job exception:", error);
      return null;
    }
  }

  /**
   * Get all jobs for an agency
   */
  static async getAgencyJobs(agencyId: string): Promise<Job[]> {
    try {
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
        .eq("agency_id", agencyId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Get agency jobs error:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Get agency jobs exception:", error);
      return [];
    }
  }

  /**
   * Get job by ID
   */
  static async getJobById(jobId: string): Promise<Job | null> {
    try {
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
    } catch (error) {
      console.error("Get job by ID exception:", error);
      return null;
    }
  }

  /**
   * Update a job
   */
  static async updateJob(
    jobId: string,
    data: Partial<JobFormData>
  ): Promise<Job | null> {
    try {
      const updateData: Record<string, string | boolean> = {};

      if (data.title) updateData.title = data.title;
      if (data.description) updateData.description = data.description;
      if (data.location) updateData.location = data.location;
      if (data.salary) {
        updateData.salary = data.salary;
        updateData.pay = data.salary;
      }
      if (data.date) {
        updateData.start_time = data.date;
        updateData.date = data.date;
      }

      const { data: job, error } = await supabaseAdmin
        .from("jobs")
        .update(updateData)
        .eq("id", jobId)
        .select()
        .single();

      if (error) {
        console.error("Update job error:", error);
        return null;
      }

      return job;
    } catch (error) {
      console.error("Update job exception:", error);
      return null;
    }
  }

  /**
   * Delete a job
   */
  static async deleteJob(jobId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from("jobs")
        .delete()
        .eq("id", jobId);

      if (error) {
        console.error("Delete job error:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Delete job exception:", error);
      return false;
    }
  }

  /**
   * Get agency statistics
   */
  static async getAgencyStats(agencyId: string): Promise<AgencyStats> {
    try {
      // Get all jobs
      const { data: allJobs, error: jobsError } = await supabaseAdmin
        .from("jobs")
        .select("id, created_at, start_time")
        .eq("agency_id", agencyId);

      if (jobsError) {
        console.error("Get jobs for stats error:", jobsError);
        return {
          totalJobs: 0,
          jobsThisWeek: 0,
          activeJobs: 0,
          totalApplications: 0,
        };
      }

      const totalJobs = allJobs?.length || 0;

      // Jobs created this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const jobsThisWeek =
        allJobs?.filter((job) => new Date(job.created_at) >= oneWeekAgo)
          .length || 0;

      // Active jobs (upcoming events)
      const now = new Date();
      const activeJobs =
        allJobs?.filter((job) => new Date(job.start_time) >= now).length || 0;

      // Get total applications
      const { data: applications, error: appsError } = await supabaseAdmin
        .from("applications")
        .select("id")
        .in("job_id", allJobs?.map((j) => j.id) || []);

      if (appsError) {
        console.error("Get applications for stats error:", appsError);
      }

      const totalApplications = applications?.length || 0;

      return {
        totalJobs,
        jobsThisWeek,
        activeJobs,
        totalApplications,
      };
    } catch (error) {
      console.error("Get agency stats exception:", error);
      return {
        totalJobs: 0,
        jobsThisWeek: 0,
        activeJobs: 0,
        totalApplications: 0,
      };
    }
  }

  /**
   * Get recent jobs (last 5)
   */
  static async getRecentJobs(agencyId: string): Promise<Job[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from("jobs")
        .select("*")
        .eq("agency_id", agencyId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Get recent jobs error:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Get recent jobs exception:", error);
      return [];
    }
  }
}
