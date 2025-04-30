import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import { db, job_status } from "@monorepo-template/db";
import { Resource } from "sst";
import crypto from "crypto";

const sqs = new SQSClient({});

const add_messages_to_queue = async (queueUrl: string, items: any[]) => {
  const results = [];
  
  // Filter out duplicates by URL to avoid unnecessary processing
  const uniqueItems = items.filter((item, index, self) => 
    index === self.findIndex((t) => t.url === item.url)
  );
  
  console.log(`Filtered ${items.length - uniqueItems.length} duplicate gallery URLs`);
  
  for (let i = 0; i < uniqueItems.length; i += 10) {
    const batch = uniqueItems.slice(i, i + 10);
    
    const command = new SendMessageBatchCommand({
      QueueUrl: queueUrl,
      Entries: batch.map((item) => {
        // Create a stable, unique message ID based on content to help with deduplication
        const messageId = crypto.createHash('md5').update(item.url).digest('hex');
        
        return {
          Id: messageId, // Stable ID based on content
          MessageBody: JSON.stringify(item),
          // Add deduplication ID for FIFO queues if needed
          // MessageDeduplicationId: messageId,
          // Add message attributes to help with filtering if needed
          MessageAttributes: {
            'GalleryId': {
              DataType: 'Number',
              StringValue: item.id.toString()
            },
          }
        };
      }),
    });
    
    try {
      const result = await sqs.send(command);
      results.push(result);
      console.log(`Successfully sent batch ${i / 10 + 1} of ${Math.ceil(uniqueItems.length / 10)}`);
      
      // Report any failed message entries
      if (result.Failed && result.Failed.length > 0) {
        console.warn(`Failed to send ${result.Failed.length} messages:`, result.Failed);
      }
    } catch (error) {
      console.error(`Error sending batch ${i / 10 + 1}:`, error);
      // Log error but continue with other batches
      continue;
    }
  }
  
  return results;
};

export const handler = async () => {
  try {
    const messages = await db.query.gallery.findMany();
    const results = await add_messages_to_queue(Resource.ScraperQueue.url, messages);

    await db.insert(job_status).values({ number_of_messages: messages.length });

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