import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, params: any) {
  const tweet = await prisma.tweets.findUnique({
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