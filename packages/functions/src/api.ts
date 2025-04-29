import { Handler } from "aws-lambda";
import { EventScraper } from "@monorepo-template/services";
import { db, gallery } from "@monorepo-template/db";

export const handler: Handler = async (_event) => {
	const scraper = new EventScraper();

	const galleries = await db.select().from(gallery).execute();
	const done = [];

	for (const gallery of galleries) {
		const results = await scraper.handler(gallery.url, gallery.id);

    if (!!results?.length) {
        done.push(...results);
    }

		console.log(`done ${done.length} galleries processed: ${galleries.length}`);
	}

    return {
      statusCode: 200,
      body: JSON.stringify({ done }, null, 4),
    };
};
