import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
