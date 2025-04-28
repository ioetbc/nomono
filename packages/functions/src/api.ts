import { Handler } from "aws-lambda";
import { Greeting } from "@monorepo-template/services";

export const handler: Handler = async (_event) => {
  if (_event.requestContext.http.method === "GET") {
    const greetingService = new Greeting();
    const name = _event.queryStringParameters?.name || "User";
    const greeting = greetingService.sayHello(name);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: greeting }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Unsupported HTTP method" }),
  };
};
