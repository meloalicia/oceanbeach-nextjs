import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

type FavoriteRequestBody = {
  beachId: number;
};

async function getUserIdFromRequest(req: NextRequest): Promise<number | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  try {
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await db.query(
      `SELECT beaches.* FROM favorites
       JOIN beaches ON beaches.id = favorites.beach_id
       WHERE favorites.user_id = $1`,
      [userId]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { beachId } = await req.json() as FavoriteRequestBody;
  if (!beachId) return NextResponse.json({ error: 'beachId obrigatório' }, { status: 400 });

  try {
    await db.query(
      `INSERT INTO favorites (user_id, beach_id) VALUES ($1, $2)
       ON CONFLICT (user_id, beach_id) DO NOTHING`,
      [userId, beachId]
    );
    return NextResponse.json({ message: 'Favorito adicionado' });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
