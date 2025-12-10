import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const { id: applicationId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Get agency profile
    const { data: agency } = await supabaseAdmin
      .from("agencies")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // Get application and verify it belongs to agency's job
    const { data: application } = await supabaseAdmin
      .from("applications")
      .select("*, job:jobs!inner(agency_id)")
      .eq("id", applicationId)
      .maybeSingle();

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((application.job as any).agency_id !== agency.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update application status
    const { data: updatedApplication, error } = await supabaseAdmin
      .from("applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", applicationId)
      .select(
        `
        *,
        job:jobs (
          id,
          title,
          location,
          agency:agencies (
            phone,
            agency_name
          )
        )
      `
      )
      .single();

    if (error) {
      console.error("Update application error:", error);
      return NextResponse.json(
        { error: "Failed to update application" },
        { status: 500 }
      );
    }

    // Create notification if approved
    if (status === "approved" && updatedApplication) {
      await supabaseAdmin.from("notifications").insert({
        candidate_id: updatedApplication.candidate_id,
        application_id: updatedApplication.id,
        type: "application_approved",
        title: "Đơn ứng tuyển được chấp nhận! 🎉",
        message: `Chúc mừng! Đơn ứng tuyển "${
          (updatedApplication.job as any).title
        }" của bạn đã được duyệt. Nhấn để liên hệ nhà tuyển dụng.`,
      });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Update application status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
