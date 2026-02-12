import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRawUnsafe("SELECT 1");
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (error: any) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "error", db: error.message },
      { status: 500 }
    );
  }
}
