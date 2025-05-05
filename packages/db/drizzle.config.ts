import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: ["./schema.sql.ts"],
	out: "./migrations",
	dbCredentials: {
		// host: Resource.Postgres.host,
		// port: Resource.Postgres.port,
		// user: Resource.Postgres.username,
		// password: Resource.Postgres.password,
		// database: Resource.Postgres.database,
		host: "localhost",
		port: 54320,
		user: "postgres",
		password: "password",
		database: "postgres",
		// ssl: true,
	},
});
