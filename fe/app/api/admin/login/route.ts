import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/app/lib/jwt";
import { verifyPassword } from "@/app/lib/password";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const adminUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !passwordHash) {
    return NextResponse.json(
      { error: "Admin credentials are not configured" },
      { status: 500 }
    );
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== adminUsername ||
    !verifyPassword(password, passwordHash)
  ) {
    return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, await signAdminToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
