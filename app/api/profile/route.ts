import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateProfile(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
