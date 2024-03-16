import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import session from '@/app/interface/session';

export async function PUT(request: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOptions);
    const body = await request.json();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized request' },
        { status: 401 }
      );
    }

    const updateUsername = await prisma.user.update({
      where: {
        id: session.session.user.id,
      },
      data: {
        username: body.username,
      },
    });

    if (!updateUsername) {
      return NextResponse.json(
        { error: "username doesn't exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateUsername);
  } catch (e) {
    console.error('PUT error on /api/users route', e);
    return NextResponse.json(
      { error: 'Internal service error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOptions);
    const body = await request.json();

    if (!session || session.session.user.id !== body.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(deleteUser);
  } catch (e) {
    console.error('DELETE error on /api/users route', e);
    return NextResponse.json(
      { error: 'Internal service error' },
      { status: 500 }
    );
  }
}
