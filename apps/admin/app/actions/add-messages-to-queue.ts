import { SQSClient, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
import crypto from "crypto";

export  const add_messages_to_queue = async (queueUrl: string, items: any[]) => {
  const results = [];

  const sqs = new SQSClient({});

  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    
    const command = new SendMessageBatchCommand({
      QueueUrl: queueUrl,
      Entries: batch.map((item) => {        
        return {
          Id: crypto.createHash('md5').update(item.url).digest('hex'),
          MessageBody: JSON.stringify(item),
        };
      }),
    });
    
    try {
      const result = await sqs.send(command);
      results.push(result);
      console.log(`Successfully sent batch ${i / 10 + 1} of ${Math.ceil(items.length / 10)}`);
    } catch (error) {
      console.error(`Error sending batch ${i / 10 + 1}:`, error);
      continue;
    }
  }
  
  return results;
};