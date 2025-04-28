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
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "managed" });
    const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });
    const openai_api_key = new sst.Secret("OPENAI_API_KEY");

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    new sst.aws.Function("MyApi", {
      vpc,
      url: true,
      link: [rds],
      handler: "packages/functions/src/api.handler",
      memory: "2 GB",
      timeout: "15 minutes",
      nodejs: {
        install: ["@sparticuz/chromium"],
      },
      environment: {
        OPENAI_API_KEY: openai_api_key.value,
      },
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
