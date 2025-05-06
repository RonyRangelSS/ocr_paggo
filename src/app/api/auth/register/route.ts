import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { email, senha, name } = await req.json();
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
  }
 
  const hashedPassword = await bcrypt.hash(senha, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name }
  });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
}
