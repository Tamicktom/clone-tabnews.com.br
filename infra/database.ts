//* Libraries imports
import { Client } from "pg";

//* local imports
import { env } from "@/env/server";

type ValidQueryValues = string | number | boolean | null;

type QueryObject = {
  text: string;
  values?: ValidQueryValues[];
}

async function query(queryObject: QueryObject) {
  const client = new Client({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  });
  await client.connect();

  const result = await client.query(queryObject.text, queryObject.values);

  await client.end();

  return result;
}

export const database = {
  query,
};