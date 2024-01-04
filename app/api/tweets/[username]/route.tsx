import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

interface params {
  params: {
    username: string
  }
}

export async function GET(request: NextRequest, params: params) {
  try {
    let tweets = await prisma.user.findUnique({
      where: {
        username: params.params.username
      },
      include: {
        Tweets: {
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
        }
      }
    })

    if (!tweets) {
      return NextResponse.json({"error": "Resouce not found"}, {status: 404})
    }
    
    return NextResponse.json(tweets.Tweets)
    
  } catch (e) {
    console.error("Error in /api/tweets/[username] route", e)
    return NextResponse.json({"error": "Internal service error"}, {status: 500})
  }
}