import { database } from "@/infra/database";

export async function GET() {
  const result = await database.query(
    {
      text: "SELECT 1;",
    }
  );

  console.log("Database query result:", result.rows);

  return new Response(
    JSON.stringify({ status: "ok" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
