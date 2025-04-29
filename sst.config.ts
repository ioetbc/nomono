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
    const vpc = new sst.aws.Vpc("Vpc", { bastion: true, nat: "managed" });
    const rds = new sst.aws.Postgres("Postgres", { vpc, proxy: true });
    const openai_api_key = new sst.Secret("OPENAI_API_KEY");

    const BASE_API_URL = 'packages/functions/src'

    new sst.x.DevCommand("DrizzleStudio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    // DLQ for failed messages
    const deadLetterQueue = new sst.aws.Queue("DLQ");
    
    // Main queue
    const queue = new sst.aws.Queue("ScraperQueue", {
        dlq: {
        retry: 5,
        queue: deadLetterQueue.arn,
      },
      visibilityTimeout: "5 minutes",
    });
    
    // consumer of the queue
    queue.subscribe({
      name: "Consumer",
      handler: `${BASE_API_URL}/consumer.handler`,
      link: [rds],
      vpc,
      environment: {
        OPENAI_API_KEY: openai_api_key.value,
      },
      memory: "2 GB",
      timeout: "5 minutes",
      nodejs: {
        install: ["@sparticuz/chromium"],
      },
    });

    // producer of the queue
    new sst.aws.Function("Producer", {
      vpc,
      url: true,
      link: [rds, queue],
      handler: `${BASE_API_URL}/producer.handler`,
    });

    new sst.aws.Function("GetExhibitions", {
      vpc,
      url: true,
      link: [rds],
      handler: `${BASE_API_URL}/api.handler`,
    });

    const admin_website = new sst.aws.React("Admin", {
      vpc,
      path: "apps/admin",
      link: [rds],
    });

    return {
      admin_url: admin_website.url,
    };
  },
});
