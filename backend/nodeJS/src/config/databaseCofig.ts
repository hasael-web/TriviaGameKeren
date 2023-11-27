// Do not expose your Neon credentials to the browser
// .env

// app.js
import * as postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}
