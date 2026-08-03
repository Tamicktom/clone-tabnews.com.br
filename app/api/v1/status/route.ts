//* Local imports
import { env } from "@/env/server";
import { database } from "@/infra/database";
import { InternalServerError } from "@/infra/errors";
import { MethodNotAllowedError } from "@/infra/errors";

export async function GET() {
  try {
    const result = await database.query({
      text: "SELECT 1;",
    });

    const databaseVersion = await database.query({
      text: "SELECT version();",
    });

    const maximumConnections = await database.query({
      text: "SHOW max_connections;",
    });

    const usedConnections = await database.query({
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [env.POSTGRES_DB],
    });

    const updatedAt = new Date().toISOString();

    const databaseVersionValue = databaseVersion.rows[0]?.version || "unknown";
    const maxConnectionsValue =
      maximumConnections.rows[0]?.max_connections || "unknown";
    const usedConnectionsValue = usedConnections.rows[0]?.count || "unknown";

    const response = {
      status: "ok",
      updated_at: updatedAt,
      database: {
        version: databaseVersionValue,
        connection: result.rowCount === 1 ? "ok" : "failed",
        max_connections: Number.parseInt(maxConnectionsValue, 10),
        used_connections: usedConnectionsValue,
      },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      message: "Serviço indisponível no momento",
      cause: error,
      statusCode: 503,
    });

    console.log("Error no controller do /status");
    console.error(publicErrorObject);

    return new Response(JSON.stringify(publicErrorObject), {
      status: publicErrorObject.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST() {
  const error = new MethodNotAllowedError();

  return new Response(
    JSON.stringify({
      name: error.name,
      message: error.message,
      action: error.action,
      status_code: error.statusCode,
    }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    },
  );
}
