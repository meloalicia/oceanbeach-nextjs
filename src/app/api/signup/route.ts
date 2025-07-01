import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

type SignupBody = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  const { name, email, password } = (await req.json()) as SignupBody;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const password_hash = await hash(password, 10);

  try {
    await db.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", [
      name,
      email,
      password_hash,
    ]);
    return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
