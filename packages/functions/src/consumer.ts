import {
	artists,
	db,
	exhibition,
	exhibition_artists,
	images,
	job_status,
	job_status_enum,
} from "@monorepo-template/db";
import type { Handler } from "aws-lambda";
import { desc, sql } from "drizzle-orm";
import { EventScraper } from "../../services/src/event-scraper";

export const handler: Handler = async (_event) => {
	try {
		const records = _event.Records || [];

		for (const record of records) {
			try {
				const body = JSON.parse(record.body);
				console.log("Processing message:", body.name);

				const scraper = new EventScraper();
				const exhibitions = await scraper.handler(body.url, body.id);

				if (!exhibitions || exhibitions.length === 0) {
					console.log(`No exhibitions found for gallery: ${body.url}`);
					continue;
				}

				for (const result of exhibitions) {
					if (result.status === "fulfilled" && result.value) {
						const exhibition_response = await db
							.insert(exhibition)
							.values({
								name: result.value?.exhibition_name ?? "N/A",
								url: result.value?.exhibition_page_url ?? "N/A",
								description: result.value?.info ?? "N/A",
								gallery_id: body.id,
								start_date: result.value?.start_date ?? null,
								end_date: result.value?.end_date ?? null,
								private_view_end_date:
									result.value?.private_view_end_date ?? null,
								private_view_start_date:
									result.value?.private_view_start_date ?? null,
							})
							.returning({
								id: exhibition.id,
							});

						for (const image_url of result.value.image_urls) {
							await db.insert(images).values({
								image_url: image_url,
								exhibition_id: exhibition_response[0].id,
							});
						}

						console.log(
							"inserting artists",
							JSON.stringify(result.value?.featured_artists),
						);

						for (const artist of result.value.featured_artists) {
							const artist_response = await db
								.insert(artists)
								.values({
									name: artist,
								})
								.returning({
									id: artists.id,
								});

							await db.insert(exhibition_artists).values({
								exhibition_id: exhibition_response[0].id,
								artist_id: artist_response[0].id,
							});
						}
					}
				}
			} catch (recordError) {
				console.error(
					`Error processing record: ${record.messageId}`,
					recordError,
				);
			} finally {
				const current_job = await db.query.job_status.findFirst({
					orderBy: desc(job_status.created_at),
				});

				if (current_job) {
					const updated_total = current_job.total + 1;
					const new_job_status =
						updated_total === current_job.number_of_messages
							? job_status_enum.enumValues[1]
							: job_status_enum.enumValues[0];

					await db
						.insert(job_status)
						.values({
							id: current_job.id,
							status: new_job_status,
							total: updated_total,
							success: current_job.success + 1,
						})
						.onConflictDoUpdate({
							target: job_status.id,
							set: {
								success: sql`${job_status.success} + 1`,
								total: sql`${job_status.total} + 1`,
								status: new_job_status,
							},
						});
				}
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
