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
			host: Resource.MyPostgres.host,
			port: Resource.MyPostgres.port,
			user: Resource.MyPostgres.username,
			password: Resource.MyPostgres.password,
			database: Resource.MyPostgres.database
		});
		
		return drizzle(pool, {
			schema,
		});
};