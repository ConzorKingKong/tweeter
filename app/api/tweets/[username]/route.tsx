import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

interface params {
  params: {
    username: string
  }
}

export async function GET(request: NextRequest, params: params) {
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
  if (tweets) {
    return NextResponse.json(tweets.Tweets)
  }

  return NextResponse.json({Tweets: []})
}