import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { CandidateService } from "@/lib/services/candidateService";
import { JobService } from "@/lib/services/jobService";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    const { jobId, message } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Get candidate profile
    const candidate = await CandidateService.getProfile(session.user.email);
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate profile not found" },
        { status: 404 }
      );
    }

    // Apply to job
    const application = await JobService.applyJob(candidate.id, jobId, message);

    if (!application) {
      return NextResponse.json(
        { error: "Failed to apply - You may have already applied" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
