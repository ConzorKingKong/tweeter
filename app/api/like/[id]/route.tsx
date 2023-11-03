import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, params) {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return NextResponse.json({})
  }

  const dbCall = await prisma.likes.findUnique({
    where: {
      likerId_tweetId: {
        tweetId: params.params.id,
        likerId: session.session.user.id
      }
    }
  })

  return NextResponse.json(dbCall)
}