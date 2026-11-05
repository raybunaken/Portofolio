import { NextRequest, NextResponse } from "next/server";
import { getAdminPasscode } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { passcode } = await request.json();
    const correctPasscode = getAdminPasscode();

    if (passcode === correctPasscode) {
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    } else {
      return NextResponse.json({ success: false, error: "Passcode salah! Silakan coba lagi." }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
