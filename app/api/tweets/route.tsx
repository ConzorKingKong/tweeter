import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import session from "@/app/interface/session";

export async function GET(request: NextRequest) {
  try {
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
  } catch(e) {
    console.error("GET error in /api/tweets/[username] route", e)
    return NextResponse.json({"error": "Internal service error"}, {status: 500})
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({}, {status: 401})
    }
  
    const body = await request.json()

    if (!body) {
      // fix status number
      return NextResponse.json({}, {status: 400})
    }
  
    
    const tweet = await prisma.tweets.create({
      data: {
        content: body.content,
        creatorId: session.session.user.id
      }
    })

    if (!tweet) {
      // error creating tweet return error
      return NextResponse.json({"error": "error creating tweet"}, {status: 500})
    }
    
    return NextResponse.json(tweet)
    
  } catch (e) {
    console.error("POST error in /api/tweets/[username] route", e)
    return NextResponse.json({}, {status: 500})
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({"error": "Unauthorized request"}, {status: 401})
    }
  
    const body = await request.json()
  
    const tweet = await prisma.tweets.findUnique({
      where: {
        id: body.id
      }
    })

    if (!tweet) {
      return NextResponse.json({"error": "Resource not found"}, {status: 404})
    }
  
  
    if (tweet?.creatorId === session.session.user.id) {
      const tweetDelete = await prisma.tweets.delete({
        where: {
          id: body.id
        }
    })

      return NextResponse.json(tweetDelete)
    } else {
      return NextResponse.json({"error": "unauthorized"}, {status: 401})
    }
  
    
  } catch(e) {
    console.error("DELETE error in /api/tweets/[username] route", e)
    return NextResponse.json({"error": "Internal service error"}, {status: 500})
  }
}