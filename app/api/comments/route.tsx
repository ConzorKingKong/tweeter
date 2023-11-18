import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import session from "@/app/interface/session"

export function GET(request: NextRequest) {
  return NextResponse.json({})
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const session: session | null = await getServerSession(authOptions)

  if (session) {
    const comment = await prisma.tweets.create({
      data: {
        content: body.content,
        parentTweetId: body.tweetId,
        creatorId: session.session.user.id
      }
    })
  
    return NextResponse.json(comment)
  }

  return NextResponse.json({})

}