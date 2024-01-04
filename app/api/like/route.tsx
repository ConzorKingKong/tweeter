import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import session from "@/app/interface/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
  
    const session: session | null = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const dbCall = await prisma.likes.create({
      data: {
        tweetId: body.id,
        likerId: session.session.user.id
      }
    })

    if (!dbCall) {
      return NextResponse.json({error: "Resource not found"}, {status: 404})
    }
  
    return NextResponse.json(dbCall)
    
  }
  catch(e) {

    console.error("Error in /like api route POST", e)

    return NextResponse.json({ error: "Internal Server Error" }, {status: 500})
  }

}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
  
    const session: session | null = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const dbCall = await prisma.likes.delete({
      where: {
        likerId_tweetId: {
          tweetId: body.id,
          likerId: session.session.user.id
        }
      }
    })

    if (!dbCall) {
      return NextResponse.json({error: "Resource not found"}, {status: 404})
    }
  
    return NextResponse.json(dbCall)
    
  }
  catch(e) {
    console.error("Error in /like api route DELETE", e)
    return NextResponse.json({ error: "Internal Server Error" }, {status: 500})
  }


}