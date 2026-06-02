import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { requireAdmin } from "@/app/lib/admin-request";

// GET /api/projects - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) return unauthorized;

    const body = await request.json();
    const { title, description, tech, category, imageUrl, repoUrl, siteUrl } = body;
    
    const newProject = await prisma.project.create({
      data: { title, description, tech, category, imageUrl, repoUrl, siteUrl },
    });
    
    return NextResponse.json(newProject);
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
