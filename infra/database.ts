//* Libraries imports
import { Client } from "pg";

//* local imports
import { env } from "@/env/server";
import { ServiceError } from "@/infra/errors";

type ValidQueryValues = string | number | boolean | null;

type QueryObject = {
  text: string;
  values?: ValidQueryValues[];
};

async function query(queryObject: QueryObject) {
  const client = await getNewClient();

  try {
    const result = await client.query(queryObject.text, queryObject.values);

    return result;
  } catch (error) {
    console.error("Database query error:", error);
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com Banco ou na Query.",
      cause: error
    });
    throw serviceErrorObject;
  } finally {
    await client?.end?.();
  }
}

async function getNewClient() {
  const client = new Client({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await client.connect();

  return client;
}

function getSSLValues() {
  if (env.NODE_ENV === "production") return true;

  return false;
}

export const database = {
  query,
  getNewClient,
};
