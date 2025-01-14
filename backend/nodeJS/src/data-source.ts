import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PGHOST,
  port: 5432,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  synchronize: true,
  migrations: ["src/migration/*.ts"],
  entities: ["src/entities/*.ts"],
  ssl: true,
});
