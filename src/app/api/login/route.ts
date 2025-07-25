import { db } from '@/lib/db'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

type LoginRequestBody = {
  email: string;
  password: string;
};
 
export async function POST(req: Request) {
  const { email, password } = await req.json() as LoginRequestBody;

  const result = await db.query(
    'SELECT id, name, password_hash FROM users WHERE email = $1',
    [email]
  )
  const user = result.rows[0]

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 })
  }

  const isPasswordValid = await compare(password, user.password_hash)
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  const token = jwt.sign(
    { userId: user.id, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  return NextResponse.json({ token })
}
