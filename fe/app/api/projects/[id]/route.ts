import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/projects/:id - Fetch single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("GET /api/projects/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/projects/:id - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const body = await request.json();
    const { title, description, tech, category, imageUrl, repoUrl, siteUrl } = body;
    
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, tech, category, imageUrl, repoUrl, siteUrl },
    });
    
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    console.error("PUT /api/projects/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/projects/:id - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/projects/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
