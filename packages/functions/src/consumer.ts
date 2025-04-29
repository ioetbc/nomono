import { Handler } from "aws-lambda";
import { db, exhibition } from "@monorepo-template/db";

export const handler: Handler = async (_event) => {
  try {
    console.log("Received SQS event:", JSON.stringify(_event));

    const records = _event.Records || [];
    console.log(`Processing ${records.length} messages`);

    await db.insert(exhibition).values({
      name: "From lambda consumer init",
      url: "https://test.com",
      description: "Test Description",
      gallery_id: 1,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully processed ${records.length} messages`,
      }),
    };
  } catch (error) {
    console.error("Error in consumer:", error);
    throw error; // Re-throw the error to make the Lambda fail and trigger SQS retry
  }
};