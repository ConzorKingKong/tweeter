import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import session from "@/app/interface/session";

export async function PUT(request: NextRequest) {
  const session: session | null = await getServerSession(authOptions)
  const body = await request.json()
  
  if (session) {
    const updateUsername = await prisma.user.update({
      where: {
        id: session.session.user.id
      },
      data: {
        username: body.username
      }
    })
    
    return NextResponse.json(updateUsername)
  }
  
  return NextResponse.json({})
}

export async function DELETE(request: NextRequest) {
  const session: session | null = await getServerSession(authOptions)
  const body = await request.json()
  
  if (session && session.session.user.id === body.id) {
    const deleteUser = await prisma.user.delete({
      where: {
        id: body.id
      }
    })
    
    return NextResponse.json(deleteUser)
  }
  
  return NextResponse.json({})
}