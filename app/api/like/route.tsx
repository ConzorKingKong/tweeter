import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import session from "@/app/interface/session";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const session: session | null = await getServerSession(authOptions)

  if (session) {
    const dbCall = await prisma.likes.create({
      data: {
        tweetId: body.id,
        likerId: session.session.user.id
      }
    })
  
    return NextResponse.json(dbCall)
  }

  return NextResponse.json({})

}

export async function DELETE(request: NextRequest) {
  const body = await request.json()

  const session: session | null = await getServerSession(authOptions)

  if (session) {
    const dbCall = await prisma.likes.delete({
      where: {
        likerId_tweetId: {
          tweetId: body.id,
          likerId: session.session.user.id
        }
      }
    })
  
    return NextResponse.json(dbCall)
  }

  return NextResponse.json({})

}