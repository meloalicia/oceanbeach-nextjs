import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function getUserIdFromRequest(req: NextRequest): Promise<number | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    const jwt = await import("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { beachId: string } }) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { beachId } = params;

  try {
    await db.query("DELETE FROM favorites WHERE user_id = $1 AND beach_id = $2", [userId, beachId]);
    return NextResponse.json({ message: "Favorito removido" });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
