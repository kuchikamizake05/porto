import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/experiences/:id - Fetch single experience
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({
      where: { id: Number(id) },
    });
    
    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("GET /api/experiences/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/experiences/:id - Update experience
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const body = await request.json();
    const { company, role, duration, description, logoUrl } = body;
    
    const updatedExperience = await prisma.experience.update({
      where: { id: Number(id) },
      data: { company, role, duration, description, logoUrl },
    });
    
    return NextResponse.json(updatedExperience);
  } catch (error: any) {
    console.error("PUT /api/experiences/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/experiences/:id - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    await prisma.experience.delete({
      where: { id: Number(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/experiences/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
