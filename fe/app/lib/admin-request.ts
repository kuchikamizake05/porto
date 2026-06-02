import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/app/lib/jwt";

export async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isValid = await verifyAdminToken(token);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
