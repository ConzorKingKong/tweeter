import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface params {
  params: {
    username: string
  }
}

export async function GET(request: NextRequest, params: params) {
  try {
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
  
    if (!user) {
      // turn this into a 400 error instead
      return NextResponse.json({
        image: "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
        username: "user does not exist",
        bio: "",
        Tweets: []
      })
    }
  
    return NextResponse.json(user)

  } catch(e) {
    console.error("GET Error on /api/users/[username] route", e)
    return NextResponse.json({"error": "Internal service error"}, {status: 500})
  }

}
