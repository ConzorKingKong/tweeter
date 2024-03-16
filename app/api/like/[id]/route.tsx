import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import prisma from '@/prisma/client';
import session from '@/app/interface/session';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: Params) {
  try {
    const userSession: session | null = await getServerSession(authOptions);

    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbCall = await prisma.likes.findUnique({
      where: {
        likerId_tweetId: {
          tweetId: params.params.id,
          likerId: userSession.session.user.id,
        },
      },
    });

    if (!dbCall) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(dbCall);
  } catch (e) {
    console.error('Error in /like/[id] api route', e);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
