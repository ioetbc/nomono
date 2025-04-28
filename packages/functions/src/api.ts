import { Handler } from "aws-lambda";
import { db, exhibition } from "@monorepo-template/db";

export const handler: Handler = async (_event) => {
  if (_event.requestContext.http.method === "GET") {
    const result = await db.select().from(exhibition).execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  }

  if (_event.requestContext.http.method === "POST") {
    // TODO: Implement db insert

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "TODO: Implement db insert" }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Neither GET nor POST" }),
  };
};
