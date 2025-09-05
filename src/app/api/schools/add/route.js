import { pool } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "Invalid file upload" }), { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name;

    // Use /tmp on Vercel (serverless)
    const filePath = path.join("/tmp", filename);
    await writeFile(filePath, bytes);

    const imagePath = `/tmp/${filename}`; // change if you use cloud storage

    // Use pool to insert into Aiven MySQL
    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    return new Response(JSON.stringify({ message: "School added successfully!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
