import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Get agency
    const { data: agency } = await supabaseAdmin
      .from("agencies")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // Check if job belongs to this agency
    const { data: existingJob } = await supabaseAdmin
      .from("jobs")
      .select("id, agency_id")
      .eq("id", id)
      .maybeSingle();

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (existingJob.agency_id !== agency.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update job
    const { data: updatedJob, error } = await supabaseAdmin
      .from("jobs")
      .update({
        title: body.title || null,
        description: body.description,
        location: body.location,
        salary: body.salary || null,
        date: body.date || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update job error:", error);
      return NextResponse.json(
        { error: "Failed to update job" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("PUT /api/agency/jobs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get agency
    const { data: agency } = await supabaseAdmin
      .from("agencies")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // Check if job belongs to this agency
    const { data: existingJob } = await supabaseAdmin
      .from("jobs")
      .select("id, agency_id")
      .eq("id", id)
      .maybeSingle();

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (existingJob.agency_id !== agency.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete job
    const { error } = await supabaseAdmin.from("jobs").delete().eq("id", id);

    if (error) {
      console.error("Delete job error:", error);
      return NextResponse.json(
        { error: "Failed to delete job" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/agency/jobs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
