//* Local imports
import { database } from "@/infra/database";

import { env } from "@/env/server";

export async function GET() {
  const result = await database.query(
    {
      text: "SELECT 1;",
    }
  );

  const databaseVersion = await database.query(
    {
      text: "SELECT version();",
    }
  );

  const maximumConnections = await database.query(
    {
      text: "SHOW max_connections;",
    }
  );

  const usedConnections = await database.query(
    {
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [env.POSTGRES_DB],
    }
  );

  const updatedAt = new Date().toISOString();

  const databaseVersionValue = databaseVersion.rows[0]?.version || "unknown";
  const maxConnectionsValue = maximumConnections.rows[0]?.max_connections || "unknown";
  const usedConnectionsValue = usedConnections.rows[0]?.count || "unknown";

  const response = {
    status: "ok",
    updated_at: updatedAt,
    database: {
      version: databaseVersionValue,
      connection: result.rowCount === 1 ? "ok" : "failed",
      max_connections: Number.parseInt(maxConnectionsValue, 10),
      used_connections: usedConnectionsValue,
    }
  };

  return new Response(
    JSON.stringify(response),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
