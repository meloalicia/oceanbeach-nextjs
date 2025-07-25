import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type User = {
  name: string;
  email: string;
};

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await db.query("SELECT id, name, email FROM users WHERE id = $1", [params.id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = (await req.json()) as User;
    const { name, email } = body;

    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
      [name, email, params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING id", [params.id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuário deletado com sucesso", id: result.rows[0].id });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
