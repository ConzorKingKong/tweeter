import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  return NextResponse.json({"content": "hello"})
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (session === null) {
    return NextResponse.json({})
  }
  const body = await request.json()

  const updateUsername = await prisma.user.update({
    where: {
      id: session.session.user.id
    },
    data: {
      username: body.username
    }
  })

  return NextResponse.json(JSON.stringify(updateUsername))
}