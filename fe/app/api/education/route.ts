import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/education - Fetch all education records
export async function GET() {
  try {
    const educations = await prisma.education.findMany();
    return NextResponse.json(educations);
  } catch (error: any) {
    console.error("GET /api/education error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/education - Create new education record
export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const body = await request.json();
    const { school, degree, duration, description, logoUrl } = body;
    
    const newEducation = await prisma.education.create({
      data: { school, degree, duration, description, logoUrl },
    });
    
    return NextResponse.json(newEducation);
  } catch (error: any) {
    console.error("POST /api/education error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
