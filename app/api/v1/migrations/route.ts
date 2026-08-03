//* Libraries imports

//* Local imports
import migrator from "@/models/migrator";

export async function GET() {
  const pendingMigrations = await migrator.listPendingMigrations();
  return new Response(
    JSON.stringify(pendingMigrations),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST() {
  const migratedMigrations = await migrator.runPendingMigrations();

  if (migratedMigrations.length > 0) {
    return new Response(
      JSON.stringify(migratedMigrations),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify(migratedMigrations),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
