import { Handler } from "aws-lambda";
import { EventScraper } from "@monorepo-template/services";
import { db, gallery } from "@monorepo-template/db";

export const handler: Handler = async (_event) => {
	const scraper = new EventScraper();

	const galleries = await db.select().from(gallery).execute();
	const done = [];

	for (const gallery of galleries) {
		if (gallery.name === "Cardi Gallery") continue;

    // update schema to be strict on this
		if (!gallery.url) {
			console.log(`no url for ${gallery.name}`);
			continue;
		}

		const results = await scraper.handler(gallery.url, gallery.id);

    if (!results) {
      console.log("no results");
      continue;
    }

    const gallery_exhibitions = results.map((result) => {
      if (result.status === "fulfilled" && result.value) {
        return result.value;
      }

      return null;
    }).filter(Boolean);

		if (gallery_exhibitions.length > 0) {
      done.push(...gallery_exhibitions);
    }

		console.log(`done ${done.length} galleries processed: ${galleries.length}`);
	}

    return {
      statusCode: 200,
      body: JSON.stringify({ done }, null, 4),
    };
};
