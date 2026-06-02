import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/experiences - Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany();
    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error("GET /api/experiences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/experiences - Create new experience
export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const body = await request.json();
    const { company, role, duration, description, logoUrl } = body;
    
    const newExperience = await prisma.experience.create({
      data: { company, role, duration, description, logoUrl },
    });
    
    return NextResponse.json(newExperience);
  } catch (error: any) {
    console.error("POST /api/experiences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
