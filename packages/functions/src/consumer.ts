import { Handler } from "aws-lambda";
import { artists, db, exhibition, images } from "@monorepo-template/db";
import { EventScraper } from "../../services/src/event-scraper";

export const handler: Handler = async (_event) => {
  try {
    const records = _event.Records || [];
    
    for (const record of records) {
      try {
        const body = JSON.parse(record.body);
        console.log("Processing message:", body);

        const scraper = new EventScraper();
        const exhibitions = await scraper.handler(body.url, body.id);

        if (!exhibitions || exhibitions.length === 0) {
          console.log(`No exhibitions found for gallery: ${body.url}`);
          continue;
        }

        for (const result of exhibitions) {
          if (result.status === "fulfilled" && result.value) {
            const exhibition_response = await db.insert(exhibition).values({
              name: result.value?.exhibition_name ?? 'N/A',
              url: result.value?.exhibition_page_url ?? 'N/A',
              description: result.value?.info ?? 'N/A',
              gallery_id: body.id,
              start_date: result.value?.start_date ?? null,
              end_date: result.value?.end_date ?? null,
              private_view_end_date: result.value?.private_view_end_date ?? null,
              private_view_start_date: result.value?.private_view_start_date ?? null,
            }).returning(
              {
                id: exhibition.id,
              }
            );

            const image_urls = JSON.parse(result.value?.image_urls ?? '[]');

            for (const image_url of image_urls) {
              await db.insert(images).values({
                image_url: image_url,
                exhibition_id: exhibition_response[0].id
              });
            }

            const featured_artists = JSON.parse(result.value?.featured_artists ?? '[]');

            for (const artist of featured_artists) {
              await db.insert(artists).values({
                name: artist,
              });
            }

            console.log(`Inserted exhibition for gallery ${body.id}: ${result.value?.exhibition_name}`);
          }
        }
      } catch (recordError) {
        // Log error but continue processing other records
        console.error(`Error processing record: ${record.messageId}`, recordError);
        // Don't throw here, allowing the batch to continue processing
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully processed ${records.length} messages`,
      }),
    };
  } catch (error) {
    console.error("Error in consumer:", error);
    // Return success to prevent SQS from retrying
    // Failed messages will go to DLQ after max retries
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Encountered error, but processing completed",
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};