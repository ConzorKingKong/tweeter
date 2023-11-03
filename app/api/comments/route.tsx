import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export function GET(request: NextRequest) {
  return NextResponse.json({})
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const session = await getServerSession(authOptions)

  const comment = await prisma.tweets.create({
    data: {
      content: body.content,
      parentTweetId: body.tweetId,
      creatorId: session.session.user.id
    }
  })

  return NextResponse.json({"created": "done"})
}