import { Handler } from "aws-lambda";
import { todo, db } from "@monorepo-template/core/db";

export const handler: Handler = async (_event) => {
  if (_event.requestContext.http.method === "GET") {
    const result = await db.select().from(todo).execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  }

  if (_event.requestContext.http.method === "POST") {
    try {
      const result = await db
        .insert(todo)
        .values({ title: "Another one Todo", description: crypto.randomUUID() })
        .returning()
        .execute();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "HMMM, Internal Server Error" }),
      };
    }
  }
};
