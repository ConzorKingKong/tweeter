import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const session = await getServerSession(authOptions)

  const dbCall = await prisma.likes.create({
    data: {
      tweetId: body.id,
      likerId: session.session.user.id
    }
  })

  return NextResponse.json({"done": "done"})
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()

  const session = await getServerSession(authOptions)

  const dbCall = await prisma.likes.delete({
    where: {
      likerId_tweetId: {
        tweetId: body.id,
        likerId: session.session.user.id
      }
    }
  })

  return NextResponse.json({"done": "done"})
}