/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "monorepo-template",
			removal: input?.stage === "production" ? "retain" : "remove",
			protect: ["production"].includes(input?.stage),
			home: "aws",
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc("Vpc", { bastion: true });
		const rds = new sst.aws.Postgres("Postgres", { vpc, proxy: true });

		const openai_api_key = new sst.Secret("OPENAI_API_KEY");
		const BASE_API_URL = "packages/functions/src";

		new sst.x.DevCommand("DrizzleStudio", {
			link: [rds],
			dev: {
				command: "npx drizzle-kit studio",
			},
		});

		const deadLetterQueue = new sst.aws.Queue("DLQ");

		const queue = new sst.aws.Queue("ScraperQueue", {
			dlq: {
				retry: 5,
				queue: deadLetterQueue.arn,
			},
			visibilityTimeout: "5 minutes",
		});

		queue.subscribe({
			name: "Consumer",
			handler: `${BASE_API_URL}/consumer.handler`,
			link: [rds],
			environment: {
				OPENAI_API_KEY: openai_api_key.value,
			},
			memory: "2 GB",
			timeout: "5 minutes",
			nodejs: {
				install: ["@sparticuz/chromium"],
			},
		});

		new sst.aws.React("Admin", {
			path: "apps/admin",
			link: [rds, queue],
		});
	},
});
