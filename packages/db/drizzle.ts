import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.sql";

const pool = new Pool({
	// host: Resource.Postgres.host,
	// port: Resource.Postgres.port,
	// user: Resource.Postgres.username,
	// password: Resource.Postgres.password,
	// database: Resource.Postgres.database,
	connectionString: "postgresql://postgres:password@localhost:54320/postgres",
	// ssl: true,
});

export const db = drizzle(pool, { schema });
