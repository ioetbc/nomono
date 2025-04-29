import { Handler } from "aws-lambda";
import { db, exhibition } from "@monorepo-template/db";

export const handler: Handler = async (_event) => {

	// const scraper = new EventScraper();

	const exhibitions = await db.query.exhibition.findMany();
	// const done = [];

	// for (const gallery of galleries) {
	// 	const results = await scraper.handler(gallery.url, gallery.id);

  //   if (!!results?.length) {
  //       done.push(...results);
  //   }

	// 	console.log(`done ${done.length} galleries processed: ${galleries.length}`);
	// }

    return {
      statusCode: 200,
      body: JSON.stringify({ exhibitions }, null, 4),
    };
};
