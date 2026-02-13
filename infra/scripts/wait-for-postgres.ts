//* Libraries imports
import { type ExecException, exec } from "node:child_process";

const TIMEOUT = 1_000;


function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(_error: ExecException | null, stdout: string) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, TIMEOUT);
      return;
    }

    console.log("\nPostgres is ready!");
  }
};

process.stdout.write("Waiting for Postgres to be ready...");
checkPostgres();