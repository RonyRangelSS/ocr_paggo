import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.password))) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT_SECRET não está definido no ambiente' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    const response = NextResponse.json({ user: { id: user.id, email: user.email } });

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,  
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro no processo de login:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
