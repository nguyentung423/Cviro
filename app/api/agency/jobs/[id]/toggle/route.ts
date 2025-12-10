import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: jobId } = await params;

    // Get agency
    const { data: agency } = await supabaseAdmin
      .from("agencies")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // Get current job
    const { data: job } = await supabaseAdmin
      .from("jobs")
      .select("published, agency_id")
      .eq("id", jobId)
      .maybeSingle();

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Verify ownership
    if (job.agency_id !== agency.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Toggle published status
    const newPublished = !job.published;

    const { data: updatedJob, error } = await supabaseAdmin
      .from("jobs")
      .update({ published: newPublished, updated_at: new Date().toISOString() })
      .eq("id", jobId)
      .select()
      .single();

    if (error) {
      console.error("Toggle job error:", error);
      return NextResponse.json(
        { error: "Failed to update job status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ published: updatedJob.published });
  } catch (error) {
    console.error("Toggle job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
