import { database } from "@/infra/database";

export async function GET() {
  const result = await database.query(
    {
      text: "SELECT 1;",
    }
  );

  const updatedAt = new Date().toISOString();

  const response = {
    status: "ok",
    updated_at: updatedAt
  };

  return new Response(
    JSON.stringify(response),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
