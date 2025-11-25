import { Client } from "pg";

type ValidQueryValues = string | number | boolean | null;

type QueryObject = {
  text: string;
  values?: ValidQueryValues[];
}

async function query(queryObject: QueryObject) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "postgres",
  });
  await client.connect();

  const result = await client.query(queryObject.text, queryObject.values);

  await client.end();

  return result;
}

export const database = {
  query,
};