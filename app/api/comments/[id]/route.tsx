import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, params: params) {
  let tweet = await prisma.tweets.findUnique({
    where: {
      id: params.params.id
    },
    include: {
      Replies: {
        include: {
          User: true,
          _count: {
            select: {
              Likes: true
            }
          }
        }
      },
      User: {
        select: {
          image: true,
          username: true
        }
      },
      _count: {
        select: {
          Likes: true
        }
      }
    }
  })

  return NextResponse.json(tweet)
}