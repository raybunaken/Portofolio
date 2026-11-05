import { NextRequest, NextResponse } from "next/server";
import { incrementArticleClap } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const claps = await incrementArticleClap(id);
    return NextResponse.json({ success: true, claps });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
