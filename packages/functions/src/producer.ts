import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import { Resource } from "sst";

const sqs = new SQSClient({});

// Generate an array of 300 sample items
const generate_messages = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i + 1}`,
    timestamp: new Date().toISOString(),
    value: Math.floor(Math.random() * 1000),
    description: `Sample item ${i + 1} for processing`,
    url: `exhibition-url.com/${i + 1}`
  }));
};

// Send items to SQS queue in batches of 10 (SQS batch limit is 10 messages)
const sendMessagesToQueue = async (queueUrl: string, items: any[]) => {
  const results = [];
  
  // Process in batches of 10
  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    
    const command = new SendMessageBatchCommand({
      QueueUrl: queueUrl,
      Entries: batch.map((item, index) => ({
        Id: `${i + index}`, // Unique ID for this batch entry
        MessageBody: JSON.stringify(item),
      })),
    });
    
    try {
      const result = await sqs.send(command);
      results.push(result);
      console.log(`Successfully sent batch ${i / 10 + 1} of ${Math.ceil(items.length / 10)}`);
    } catch (error) {
      console.error(`Error sending batch ${i / 10 + 1}:`, error);
      throw error;
    }
  }
  
  return results;
};

export const handler = async () => {
  try {
    const messages = generate_messages();
    console.log(`Generated ${messages.length} items to send to queue`);
    const results = await sendMessagesToQueue(Resource.ScraperQueue.url, messages);
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Successfully sent ${messages.length} items to the queue`,
        batches: results.length,
      }),
    };
  } catch (error) {
    console.error("Error in producer:", error);
    
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Error sending items to queue",
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};