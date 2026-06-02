import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/education/:id - Fetch single education record
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const education = await prisma.education.findUnique({
      where: { id: Number(id) },
    });
    
    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(education);
  } catch (error: any) {
    console.error("GET /api/education/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/education/:id - Update education record
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const body = await request.json();
    const { school, degree, duration, description, logoUrl } = body;
    
    const updatedEducation = await prisma.education.update({
      where: { id: Number(id) },
      data: { school, degree, duration, description, logoUrl },
    });
    
    return NextResponse.json(updatedEducation);
  } catch (error: any) {
    console.error("PUT /api/education/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/education/:id - Delete education record
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    await prisma.education.delete({
      where: { id: Number(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/education/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
