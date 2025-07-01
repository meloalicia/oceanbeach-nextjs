import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query("SELECT NOW()");
    return NextResponse.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error("Erro ao conectar com o banco:", err);
    return NextResponse.json(
      { success: false, error: "Falha na conexão com o banco" },
      { status: 500 }
    );
  }
}
