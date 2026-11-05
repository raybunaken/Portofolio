import { NextRequest } from "next/server";

const DEFAULT_PASSCODE = process.env.ADMIN_PASSCODE || "dzaky123";

export function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
  if (!authHeader) return false;

  const key = authHeader.replace(/^Bearer\s+/i, "").trim();
  return key === DEFAULT_PASSCODE;
}

export function getAdminPasscode(): string {
  return DEFAULT_PASSCODE;
}
