import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import session from "@/app/interface/session";

interface params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, params: params) {
  const session: session | null = await getServerSession(authOptions)

  if (session) {
    const dbCall = await prisma.likes.findUnique({
      where: {
        likerId_tweetId: {
          tweetId: params.params.id,
          likerId: session.session.user.id
        }
      }
    })
  
    return NextResponse.json(dbCall)
  }

  return NextResponse.json({})

}