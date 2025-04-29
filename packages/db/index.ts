import { Resource } from "sst";
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import schema from "./schema.sql";

export * from "./drizzle";
export * from "./schema.sql";
export * as schema from "./schema.sql";

export const create_db = () => {

		// Fallback to local database connection for development
		const pool = new Pool({
			host: Resource.Postgres.host,
			port: Resource.Postgres.port,
			user: Resource.Postgres.username,
			password: Resource.Postgres.password,
			database: Resource.Postgres.database
		});
		
		return drizzle(pool, {
			schema,
		});
};