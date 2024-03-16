import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import prisma from '@/prisma/client';
import session from '@/app/interface/session';

export async function POST(request: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOptions);
    const body = await request.json();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const comment = await prisma.tweets.create({
      data: {
        content: body.content,
        parentTweetId: body.tweetId,
        creatorId: session.session.user.id,
      },
    });

    return NextResponse.json(comment);
  } catch (e) {
    console.error('POST error on /api/comments route', e);
    return NextResponse.json(
      { error: 'Internal service error' },
      { status: 500 }
    );
  }
}
