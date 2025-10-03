import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    // Build the where clause for user search
    const whereClause = search 
      ? {
          OR: [
            { name: { contains: search } },
            { username: { contains: search } }
          ]
        }
      : {};

    // Fetch users with search functionality
    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        username: true
      },
      orderBy: {
        name: 'asc'
      },
      take: 5
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error loading users:', error);
    return NextResponse.json(
      { error: 'Failed loading users' },
      { status: 500 }
    );
  }
}
