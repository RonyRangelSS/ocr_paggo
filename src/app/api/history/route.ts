import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET!; 

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

  const userHistory = await prisma.user.findUnique({
    where: { id: String(decoded.userId) },
    include: {
      files: {
        include: {
          transcription: true,
          questions: true,
        },
      },
    },
  });

  return NextResponse.json(userHistory);
}
