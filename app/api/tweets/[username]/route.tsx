import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'

export async function GET(request: NextRequest, params: any) {
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
    tweets = {Tweets: []}
  }
  return NextResponse.json(tweets.Tweets)
}