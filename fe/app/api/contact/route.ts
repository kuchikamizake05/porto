import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;
    
    await prisma.contact.create({
      data: { name, message },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
