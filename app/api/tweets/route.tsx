import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import session from "@/app/interface/session";

export async function GET(request: NextRequest) {
  const tweets = await prisma.tweets.findMany({
    take: 20,
    where: {
      parentTweetId: null
    },
    include: {
      _count: {
        select: {
          Likes: true
        }
      },
      User: {
        select: {
          image: true,
          username: true
        }
      }
    }
  })
  return NextResponse.json(tweets)
}

export async function POST(request: NextRequest) {
  const session: session | null = await getServerSession(authOptions)

  const body = await request.json()

  if (session) {
    const tweet = await prisma.tweets.create({
      data: {
        content: body.content,
        creatorId: session.session.user.id
      }
    })
  
    return NextResponse.json(tweet)
  }

  return NextResponse.json({})

}

export async function DELETE(request: NextRequest) {
  const session: session | null = await getServerSession(authOptions)

  const body = await request.json()

  const tweet = await prisma.tweets.findUnique({
    where: {
      id: body.id
    }
  })

  if (session) {

    if (tweet?.creatorId === session.session.user.id) {
      const tweetDelete = await prisma.tweets.delete({
        where: {
          id: body.id
        }
      })
      return NextResponse.json(tweetDelete)
    } else {
      return NextResponse.json({"not deleted": "make proper 401 error forbidden"})
    }

  }
  
  return NextResponse.json({"not deleted": "make proper 401 error forbidden"})

}