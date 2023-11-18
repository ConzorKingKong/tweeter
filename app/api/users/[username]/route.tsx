import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, params: any) {

  let user = await prisma.user.findUnique({
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

  if (user) {
    return NextResponse.json(user)
  }

  return NextResponse.json({
    image: "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    username: "user does not exist",
    bio: "",
    Tweets: []
  })

}
